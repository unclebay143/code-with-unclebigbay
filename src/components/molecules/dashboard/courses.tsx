'use client';

import React, { useEffect, useState } from 'react';
import { CourseCard, CourseCardSkeleton } from './course-card';
import {
  InputField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '@hashnode/matrix-ui';
import { Courses as CoursesType } from '@/utils/types';
import { Button } from '../../atoms/Button';
import { useSearchParams } from 'next/navigation';
import useTag from '@/components/hooks/useTag';
import { capitalizeFirstLetter } from '@/utils';

type Props = {
  courses?: CoursesType;
  showLoadMoreButton?: boolean;
  showCounter?: boolean;
  hideSearchOptions?: boolean;
  size?: number;
  hideReachedEnd?: boolean;
  isFetching?: boolean;
  loaderCounter?: number;
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
}: Props) => {
  const { tags } = useTag();
  const [coursesToShow, setCoursesToShow] = useState(defaultCourses);
  const showCourses = !isFetching && coursesToShow && coursesToShow?.length > 0;
  const noCourses = !isFetching && coursesToShow && coursesToShow?.length < 1;
  const showReachedEnd = !isFetching && !hideReachedEnd && !noCourses;
  const searchParams = useSearchParams();
  const searchParamTagName = searchParams.get('tag');
  const [showLoader, setShowLoader] = useState(isFetching);

  console.log(tags);

  const coursesTotal = coursesToShow?.length;

  const searchCourseByTag = async (tagName: string) => {
    setShowLoader(true);
    const tagCoursesResult = await fetch('/api/courses/tag/' + tagName);
    const tagCourses = await tagCoursesResult.json();
    setCoursesToShow(tagCourses.courses);
    setShowLoader(false);
  };

  useEffect(() => {
    if (searchParamTagName) {
      searchCourseByTag(searchParamTagName);
    }
  }, [searchParamTagName]);

  return (
    <section className="flex flex-col gap-3">
      {hideSearchOptions || (
        <div className="flex flex-col sm:flex-row gap-2">
          <InputField placeholder="Find a course to learn" size="sm" />
          <div className="sm:w-[200px]">
            <Select onValueChange={(e) => searchCourseByTag(e)}>
              <SelectTrigger
                size="lg"
                style={{
                  borderRadius: '12px',
                  borderColor: '#cbd5e1',
                }}
              />
              <SelectContent>
                <SelectViewPort>
                  {tags?.map((tag) => (
                    <SelectItem
                      key={tag._id}
                      value={tag.name}
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
