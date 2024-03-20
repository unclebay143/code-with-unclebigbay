'use client';

import React, { useEffect } from 'react';
import { CourseCard, CourseCardSkeleton } from './course-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '../../atoms/Select';
import { Courses as CoursesType } from '@/utils/types';
import { Button } from '../../atoms/Button';
import useCourse from '@/components/hooks/useCourse';

type Props = {
  courses?: CoursesType;
  showLoadMoreButton?: boolean;
  showCounter?: boolean;
  hideSearchOptions?: boolean;
  size?: number;
  setCount?: Function;
  hideReachedEnd?: boolean;
};

export const Courses = ({
  courses,
  showLoadMoreButton,
  hideSearchOptions,
  showCounter,
  hideReachedEnd,
  size,
  setCount,
}: Props) => {
  const { courses: defaultCourses, isFetching } = useCourse();
  const data = courses || defaultCourses;
  const count = data?.length;

  const noData = !isFetching && data && data?.length < 1;

  useEffect(() => {
    if (setCount) {
      setCount(count);
    }
  }, [count, setCount]);

  return (
    <section className="flex flex-col gap-3">
      {hideSearchOptions || (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full">
            <input
              className="border rounded-xl text-slate-600 w-full py-3 pl-4 pr-2"
              placeholder="Find learning course"
            />
          </div>
          <div className="sm:w-[200px]">
            <Select onValueChange={(e) => console.log(e)}>
              <SelectTrigger size="md" placeholder="Select a course..." />
              <SelectContent>
                <SelectViewPort>
                  <SelectItem value={'value-1'} label="HTML" />
                </SelectViewPort>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {showCounter && <p className="text-slate-600">Total: {data?.length}</p>}
      <section className="max-w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {/* <CourseCardSkeleton />
        {!isFetching && courses?.length > 0 && (
          <CourseCard course={courses[0]} />
        )} */}
        {isFetching ? (
          <>
            {Array(3)
              .fill({})
              .map((_, index) => (
                <CourseCardSkeleton key={`CourseCardSkeleton-${index}`} />
              ))}
          </>
        ) : (
          <>
            {data?.slice(0, size).map((course) => {
              return <CourseCard key={course._id} course={course} />;
            })}
          </>
        )}
      </section>
      {showLoadMoreButton && (
        <section className="flex justify-center">
          <Button appearance="secondary-slate" size="sm">
            Load more
          </Button>
        </section>
      )}
      {noData && (
        <div className="text-center py-5 text-slate-600">
          <p>No course available at this time.</p>
        </div>
      )}

      {noData || hideReachedEnd || (
        <div className="text-center py-5 text-slate-600">
          <p>You&apos;ve reached the end 👋🏽</p>
        </div>
      )}
    </section>
  );
};
