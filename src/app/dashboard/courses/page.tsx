'use client';

import { Button } from '@/components/atoms/Button';
import useCourse from '@/components/hooks/useCourse';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { Courses } from '@/components/molecules/dashboard/courses';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { showCount } from '@/utils';
import Link from 'next/link';
// import { Sparkles } from 'lucide-react';
import React from 'react';

const Page = () => {
  const { data: currentUser } = useCurrentStudent();
  const isAdmin = currentUser?.isAdmin;
  const { courses, isFetching } = useCourse();
  const count = courses?.length || 0;

  return (
    <div className="flex flex-col gap-3">
      {/* <div className="sticky top-[75px] lg:top-[82px] z-10 bg-white rounded-b-lg">
        <WhiteArea border>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <h3 className="text-xl font-medium ">
                Browse learning courses
              </h3>
              <Sparkles size={16} />
            </div>
            <Button size="sm" appearance="secondary-slate">
              Back to top
            </Button>
          </div>
        </WhiteArea>
      </div> */}
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <DashboardSubheading
              title={`Available Courses ${showCount(count)}`}
              copy="These courses are personalized based on your stack."
            />
            {isAdmin && (
              <Button size="xs" asChild>
                <Link href="/dashboard/admin/courses/new">New course</Link>
              </Button>
            )}
          </div>
          <Courses
            courses={courses}
            isFetching={isFetching}
            hideSearchOptions
          />
        </div>
      </WhiteArea>
    </div>
  );
};

export default Page;
