import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  InputField,
  MatrixImage as Image,
  SearchContentField,
} from '@hashnode/matrix-ui';
import debounce from 'lodash/debounce';
import { zodResolver } from '@hookform/resolvers/zod';
import { Student, Students } from '@/utils/types';
import { DEFAULT_PROFILE_PHOTO } from '@/utils';

const StudentSearchResultSkeleton = ({ count = 3 }: { count?: number }) => (
  <>
    {Array(count)
      .fill(true)
      .map((_, index) => (
        <div
          className="animate-pulse w-full flex items-center py-2 h-[72px] pl-2 gap-3"
          // eslint-disable-next-line react/no-array-index-key
          key={`StudentSearchResultSkeleton-${index}`}
        >
          <div className="rounded-full border border-slate-50 overflow-hidden h-10 w-10 bg-slate-100" />
          <div className="flex flex-col flex-1 mt-2 md:(mt-0)">
            <div className="rounded-lg h-4 w-4/12 bg-slate-100" />
            <div className="mt-3 rounded-lg h-3 w-5/12 bg-slate-100" />
          </div>
        </div>
      ))}
  </>
);

type SearchTermSchema = z.infer<typeof searchTermSchema>;
const searchTermSchema = z.object({
  searchTerm: z.string(),
});

export const StudentSearchField = ({
  setSelection,
  exclusion, // i.e already selected users
}: {
  setSelection: Function;
  exclusion: Pick<
    Student,
    '_id' | 'fullName' | 'photo' | 'username' | 'email'
  >[];
}) => {
  const [searchTermChanged, setSearchTermChanged] = useState<boolean>(false);

  const { register, control, setValue } = useForm<SearchTermSchema>({
    resolver: zodResolver(searchTermSchema),
    defaultValues: {
      searchTerm: '',
    },
  });

  const searchResults: Pick<
    Student,
    '_id' | 'fullName' | 'photo' | 'username' | 'email'
  >[] = [
    {
      email: '',
      _id: '',
      fullName: 'Ayodele Samuel Adebayo',
      username: 'unclebay143',
      photo: '',
    },
  ];
  const isSearchingUser = false;
  const searchTerm = useWatch({
    control,
    name: 'searchTerm',
  });

  const clearSearchTermInput = () => {
    setValue('searchTerm', '');
  };

  const hasSearchTerm = searchTerm !== '';
  const isNotSearchingHashnodeUsers = !isSearchingUser;

  // Exclude already selected users from result if email or id matches
  const filteredResult = searchResults?.filter(
    (result) =>
      !exclusion?.some((user) => (user?.username ?? '') === result.username),
  );

  console.log(filteredResult);

  const hasSearchResults = filteredResult && filteredResult.length > 0;
  const hasNoSearchResult =
    hasSearchTerm && isNotSearchingHashnodeUsers && !hasSearchResults;

  const showInitialLoader = isSearchingUser || searchTermChanged;
  const showSearchResults =
    !searchTermChanged && hasSearchTerm && hasSearchResults; // when search term hasn't change and there's input value and search result
  const showLoadMoreLoader = isSearchingUser;

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
    if (searchTermChanged && !isSearchingUser) {
      setSearchTermChanged(false);
    }
  }, [isSearchingUser, searchTermChanged]);

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

      {/* {showInitialLoader && (
        <section className="w-full absolute top-20 z-10 bg-white shadow-xl py-2 border border-slate-300 rounded-xl">
          <StudentSearchResultSkeleton />
        </section>
      )} */}

      {hasNoSearchResult && (
        <section className="w-full absolute top-20 z-10 bg-white shadow-xl py-2 border border-slate-300 rounded-xl">
          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            No user matches your search. Try searching their exact username or
            name.
          </p>
        </section>
      )}

      {showSearchResults && (
        <section className="w-full absolute top-90 z-10 bg-white shadow-xl py-2 border rounded-lg">
          {/* user search result  */}
          <div className="max-h-[400px]">
            {filteredResult?.map((student) => (
              <button
                key={`StudentSearch-${student.username}`}
                type="button"
                onClick={() => {
                  clearSearchTermInput();
                  setSelection((prevSelection: any) => [
                    ...prevSelection,
                    student,
                  ]);
                }}
                className="w-full text-left cursor-pointer flex justify-between items-center py-1 h-10 px-3 gap-3 hover:bg-slate-50"
                disabled={!!student}
              >
                <section className="flex justify-between items-center gap-3">
                  <Avatar size="sm">
                    <Image
                      src={student?.photo || DEFAULT_PROFILE_PHOTO}
                      alt={student?.fullName || 'Default profile photo'}
                      fill
                    />
                  </Avatar>
                  <section>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {student.fullName}
                    </h3>
                    <p className="text-sm text-slate-500">
                      @{student.username}
                    </p>
                  </section>
                </section>
              </button>
            ))}

            {/* {showLoadMoreLoader && <StudentSearchResultSkeleton />} */}
          </div>
        </section>
      )}
    </section>
  );
};
