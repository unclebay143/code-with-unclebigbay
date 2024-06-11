'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Courses } from '@/components/molecules/dashboard/courses';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { showCount } from '@/utils';
import { Courses as CoursesType, Student } from '@/utils/types';
import { Button } from '@hashnode/matrix-ui';

const CoursesPage = ({
  courses,
  currentStudent,
}: {
  courses: CoursesType;
  currentStudent: Student | null;
}) => {
  const isAdmin = currentStudent?.isAdmin;
  const [courseCount, setCourseCount] = useState<number>(0);
  const isLoggedIn = !!currentStudent;

  const copy = isLoggedIn
    ? 'These courses are personalized based on your stack.'
    : 'Login to see only personalized courses based on your stack.';

  return (
    <div className="flex flex-col gap-3">
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          {isAdmin && (
            <div className="flex justify-start">
              <Button size="xs" appearance="primary-slate" asChild>
                <Link href="/dashboard/admin/courses/new">New course</Link>
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="w-full flex items-end justify-center">
              <div className="w-full flex flex-col gap-1">
                <DashboardSubheading
                  title={`Available Courses ${showCount(courseCount)}`}
                />
                <span className="text-sm text-slate-600">{copy}</span>
              </div>
            </div>
          </div>

          <Courses
            courses={courses}
            hideSearchOptions
            loaderCounter={6}
            hideReachedEnd
            setCourseCount={setCourseCount}
          />
        </div>
      </WhiteArea>
    </div>
  );
};

export default CoursesPage;
