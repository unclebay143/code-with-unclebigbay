'use client';

import React from 'react';
import Link from 'next/link';
import { Courses } from '@/components/molecules/dashboard/courses';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { showCount } from '@/utils';
import { Courses as CoursesType, Student } from '@/utils/types';
import { ArrowLeft, Button } from '@hashnode/matrix-ui';

const CoursesPage = ({
  courses,
  currentStudent,
}: {
  courses: CoursesType;
  currentStudent: Student | null;
}) => {
  const isAdmin = currentStudent?.isAdmin;

  const count = courses?.length || 0;
  const noCourses = courses?.length === 0;
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
              <Button size="xs" asChild>
                <Link href="/dashboard/admin/courses/new">New course</Link>
              </Button>
            </div>
          )}

          <div className="flex justify-start lg:hidden">
            <Button
              size="xs"
              appearance="secondary-slate"
              startIcon={ArrowLeft}
              asChild
            >
              <Link href="/dashboard/admin/courses">All courses</Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full flex items-end justify-center">
              <div className="w-full flex flex-col gap-1">
                <DashboardSubheading
                  title={`Available Courses ${showCount(count)}`}
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
          />
          {noCourses && <EmptyState label="No course to display here ☹️" />}
        </div>
      </WhiteArea>
    </div>
  );
};

export default CoursesPage;
