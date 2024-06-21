'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { CourseCard, CourseCardSkeleton } from './course-card';
import {
  ArrowExternalLink01,
  DocumentGuide,
  EmptyState,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
  Button,
} from '@hashnode/matrix-ui';
import { Courses as CoursesType } from '@/utils/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useTag from '@/components/hooks/useTag';
import { capitalizeFirstLetter } from '@/utils';
import { EmptyStateContainer } from './EmptyStateContainer';
import Link from 'next/link';

type Props = {
  courses?: CoursesType;
  showLoadMoreButton?: boolean;
  showCounter?: boolean;
  hideSearchOptions?: boolean;
  size?: number;
  hideReachedEnd?: boolean;
  isFetching?: boolean;
  loaderCounter?: number;
  setCourseCount?: Function;
  hideEmptyState?: boolean;
};

export const Courses = ({
  courses: defaultCourses,
  showLoadMoreButton,
  hideSearchOptions,
  showCounter,
  hideReachedEnd,
  size,
  isFetching,
  loaderCounter = 3,
  setCourseCount,
  hideEmptyState,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamTagName = searchParams.get('tag');
  const { tags } = useTag();
  const [coursesToShow, setCoursesToShow] = useState(defaultCourses);
  const [coursesTotal, setCoursesTotal] = useState(coursesToShow?.length);
  const [isSearchingViaTag, setIsSearchingViaTag] = useState(false);

  const isLoading = isFetching || isSearchingViaTag;
  const showLoader = isLoading;
  const showCourses = !isLoading && coursesToShow && coursesToShow?.length > 0;
  const noCourses = !isLoading && coursesToShow && coursesToShow?.length === 0;
  const showReachedEnd = !isFetching && !hideReachedEnd && !noCourses;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const searchCourseByTag = async (tagName: string) => {
    router.push(pathname + '?' + createQueryString('tag', tagName));

    if (tagName === 'all') {
      setCoursesToShow(defaultCourses);
      setCoursesTotal(defaultCourses?.length);
      if (setCourseCount) {
        setCourseCount(defaultCourses?.length);
      }
      return;
    }

    setIsSearchingViaTag(true);
    fetch('/api/courses/tag/' + tagName)
      .then((res) => res.json())
      .then((tagCourses) => {
        setCoursesToShow(tagCourses.courses);
        setCoursesTotal(tagCourses.courses?.length);

        if (setCourseCount) {
          setCourseCount(tagCourses.courses?.length);
        }
      })
      .finally(() => {
        setIsSearchingViaTag(false);
      });
  };

  useEffect(() => {
    if (searchParamTagName) {
      searchCourseByTag(searchParamTagName);
    } else {
      if (setCourseCount) setCourseCount(defaultCourses?.length);
      setCoursesToShow(defaultCourses);
    }
  }, [defaultCourses, searchParamTagName]);

  return (
    <section className="flex flex-col gap-3">
      {hideSearchOptions || (
        <div className="flex flex-col sm:flex-row gap-2">
          {/* <InputField placeholder="Find a course to learn" size="sm" /> */}
          <div className="sm:w-[200px]">
            <Select
              onValueChange={(e) => searchCourseByTag(e)}
              defaultValue={searchParamTagName?.toLowerCase()}
            >
              <SelectTrigger
                size="lg"
                style={{
                  borderRadius: '12px',
                  borderColor: '#cbd5e1',
                }}
              />
              <SelectContent>
                <SelectViewPort>
                  <SelectItem value="all" label="All" />
                  {tags?.map((tag) => (
                    <SelectItem
                      key={tag._id}
                      value={tag.name.toLowerCase()}
                      label={capitalizeFirstLetter(tag.name)}
                    />
                  ))}
                </SelectViewPort>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {showCounter && <p className="text-slate-600">Total: {coursesTotal}</p>}
      <section className="max-w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {showLoader && (
          <>
            {Array(loaderCounter)
              .fill({})
              .map((_, index) => (
                <CourseCardSkeleton key={`CourseCardSkeleton-${index}`} />
              ))}
          </>
        )}
        {showCourses && (
          <>
            {coursesToShow?.slice(0, size).map((course) => {
              return <CourseCard key={course._id} course={course} />;
            })}
          </>
        )}
      </section>

      {noCourses && !hideEmptyState && (
        <EmptyStateContainer>
          <EmptyState
            icon={DocumentGuide}
            title="No course found"
            copy={`There's currently no course result for ${searchParamTagName ? `"${searchParamTagName}"` : 'your stack'}.`}
            ctaElement={
              <Button
                appearance="secondary-slate"
                size="xs"
                endIcon={ArrowExternalLink01}
                asChild
              >
                <Link
                  target="_blank"
                  rel="noopener"
                  href="https://dub.sh/make-a-v-request"
                >
                  Make a request.
                </Link>
              </Button>
            }
          />
        </EmptyStateContainer>
      )}

      {showLoadMoreButton && !hideReachedEnd && (
        <section className="flex justify-center">
          <Button appearance="secondary-slate" size="sm">
            Load more
          </Button>
        </section>
      )}

      {showReachedEnd && (
        <div className="text-center py-5 text-slate-600">
          <p>You&apos;ve reached the end 👋🏽</p>
        </div>
      )}
    </section>
  );
};
