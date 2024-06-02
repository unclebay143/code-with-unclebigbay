'use client';

import React from 'react';
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
  courses,
  showLoadMoreButton,
  hideSearchOptions,
  showCounter,
  hideReachedEnd,
  size,
  isFetching,
  loaderCounter = 3,
}: Props) => {
  const noData = !isFetching && courses && courses?.length < 1;
  const showReachedEnd = !isFetching && !hideReachedEnd && !noData;

  return (
    <section className="flex flex-col gap-3">
      {hideSearchOptions || (
        <div className="flex flex-col sm:flex-row gap-2">
          <InputField placeholder="Find learning course" size="sm" />
          <div className="sm:w-[200px]">
            <Select onValueChange={(e) => console.log(e)}>
              <SelectTrigger
                size="lg"
                style={{
                  borderRadius: '12px',
                  borderColor: '#cbd5e1',
                }}
              />
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
        {isFetching && (
          <>
            {Array(loaderCounter)
              .fill({})
              .map((_, index) => (
                <CourseCardSkeleton key={`CourseCardSkeleton-${index}`} />
              ))}
          </>
        )}
        {!noData && (
          <>
            {courses?.slice(0, size).map((course) => {
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
