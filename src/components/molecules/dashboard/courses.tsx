import React from 'react';
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
import { EmptyState } from './empty-state';

type Props = {
  courses?: CoursesType;
  showLoadMoreButton?: boolean;
  showCounter?: boolean;
  hideSearchOptions?: boolean;
  size?: number;
  hideReachedEnd?: boolean;
  isFetching: boolean;
};

export const Courses = ({
  courses,
  showLoadMoreButton,
  hideSearchOptions,
  showCounter,
  hideReachedEnd,
  size,
  isFetching,
}: Props) => {
  const noData = !isFetching && courses && courses?.length < 1;

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
      {showCounter && (
        <p className="text-slate-600">Total: {courses?.length}</p>
      )}
      <section className="max-w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
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
            {courses?.slice(0, size).map((course) => {
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
        <EmptyState
          label="Your recent learning materials will appear here 🙌🏾"
          noBorder
        />
      )}

      {(!isFetching && (noData || hideReachedEnd)) || (
        <div className="text-center py-5 text-slate-600">
          <p>You&apos;ve reached the end 👋🏽</p>
        </div>
      )}
    </section>
  );
};
