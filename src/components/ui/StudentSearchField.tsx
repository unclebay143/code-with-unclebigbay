import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  MatrixImage as Image,
  SearchContentField,
} from '@hashnode/matrix-ui';
import debounce from 'lodash/debounce';
import { zodResolver } from '@hookform/resolvers/zod';
import { Students } from '@/utils/types';
import { DEFAULT_PROFILE_PHOTO } from '@/utils';
import useStudent from '../hooks/useStudent';
import { toast } from 'sonner';

const StudentSearchResultSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="animate-pulse w-full flex items-center py-1 h-10 pl-2 gap-3">
    <div className="rounded-full border border-slate-50 overflow-hidden h-10 w-10 bg-slate-100" />
    <div className="flex flex-col flex-1 mt-2 md:(mt-0)">
      <div className="rounded-lg h-3 w-4/12 bg-slate-100" />
      <div className="mt-2 rounded-lg h-3 w-5/12 bg-slate-100" />
    </div>
  </div>
);

type SearchTermSchema = z.infer<typeof searchTermSchema>;
const searchTermSchema = z.object({
  searchTerm: z.string(),
});

export const StudentSearchField = ({
  setSelection,
  exclusion, // i.e already selected users
  maxSelection,
}: {
  setSelection: Function;
  exclusion: Students;
  maxSelection?: number;
}) => {
  const [searchTermChanged, setSearchTermChanged] = useState<boolean>(false);

  const { register, control, setValue, reset } = useForm<SearchTermSchema>({
    resolver: zodResolver(searchTermSchema),
    defaultValues: {
      searchTerm: '',
    },
  });

  const searchTerm = useWatch({
    control,
    name: 'searchTerm',
  });

  const { data: searchResult, isPending: isStudentSearchPending } =
    useStudent(searchTerm);

  // Exclude already selected users from result if email or id matches
  const alreadySelected = exclusion?.some(
    (student) => (student?.username ?? '') === searchResult?.username,
  );

  const clearSearchTermInput = () => {
    setValue('searchTerm', '');
  };

  const hasSearchTerm = searchTerm !== '';
  const isNotSearchingHashnodeUsers = !isStudentSearchPending;

  const hasReachedMaxSelection = maxSelection === exclusion.length;

  const hasSearchResults = !!searchResult && !alreadySelected;
  const hasNoSearchResult =
    hasSearchTerm &&
    isNotSearchingHashnodeUsers &&
    !hasSearchResults &&
    !alreadySelected;

  const showLoader =
    searchTerm && (isStudentSearchPending || searchTermChanged);

  const showSearchResults =
    !searchTermChanged && hasSearchTerm && hasSearchResults; // when search term hasn't change and there's input value and search result

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchTermChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const REGEX_FILTER_WHITESPACE = /\s+/g;
      const currentSearchKey = e.target.value;
      const sanitizedCurrentSearchKey = currentSearchKey
        .trim()
        .replace(REGEX_FILTER_WHITESPACE, ' ');
      if (searchTerm === sanitizedCurrentSearchKey) return null;
      setSearchTermChanged(true);

      return setValue('searchTerm', sanitizedCurrentSearchKey);
    }, 300),
    [searchTerm],
  );

  useEffect(() => {
    // Invalidate searchTermChanged for searchTerm with results
    if (searchTermChanged && !isStudentSearchPending) {
      setSearchTermChanged(false);
    }
  }, [isStudentSearchPending, searchTermChanged]);

  const absoluteWrapper =
    'w-full absolute top-10 z-10 bg-white shadow-xl py-2 border rounded-lg';

  return (
    <section className="relative">
      <section className="text-sm text-slate-600 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md">
        <SearchContentField
          size="sm"
          appearance="inline"
          placeholder="Enter team username"
          {...register('searchTerm')}
          onChange={handleSearchTermChange}
          onCancel={clearSearchTermInput}
        />
      </section>

      {showLoader && (
        <section className={absoluteWrapper}>
          <StudentSearchResultSkeleton />
        </section>
      )}

      {hasNoSearchResult && (
        <section className={absoluteWrapper}>
          <p className="text-center text-sm text-slate-500">
            No user matches your search.
          </p>
        </section>
      )}

      {alreadySelected && (
        <section className={absoluteWrapper}>
          <p className="text-center text-sm text-slate-500">
            <span className="font-medium">&apos;{searchTerm}&apos;</span> is
            already added as member.
          </p>
        </section>
      )}

      {showSearchResults && (
        <section className="w-full absolute top-90 z-10 bg-white shadow-xl py-3 border rounded-lg">
          {/* user search result  */}
          <div className="max-h-[400px]">
            <button
              key={`StudentSearch-${searchResult.username}`}
              type="button"
              onClick={() => {
                if (hasReachedMaxSelection)
                  return toast.error('Maximum number of members reached.');
                reset({ searchTerm: '' });
                setSelection((prevSelection: any) => [
                  ...prevSelection,
                  searchResult,
                ]);
              }}
              className="w-full text-left cursor-pointer flex justify-between items-center py-1 h-10 px-3 gap-3 hover:bg-slate-50"
            >
              <section className="flex justify-between items-center gap-3">
                <Avatar size="sm">
                  <Image
                    src={searchResult.photo || DEFAULT_PROFILE_PHOTO}
                    alt={searchResult?.fullName || 'Default profile photo'}
                    fill
                  />
                </Avatar>
                <section>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {searchResult.fullName}
                  </h3>
                  <p className="text-sm text-slate-500">
                    @{searchResult.username}
                  </p>
                </section>
              </section>
            </button>

            {/* {showLoadMoreLoader && <StudentSearchResultSkeleton />} */}
          </div>
        </section>
      )}
    </section>
  );
};
