'use client';

import { Courses } from '@/components/dashboard/courses';
import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/dashboard/white-area';
import { materials } from '@/utils/dummy-data';
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* <div className="sticky top-[75px] lg:top-[82px] z-10 bg-white rounded-b-lg">
        <WhiteArea border>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <h3 className="text-xl font-medium ">
                Browse learning materials
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
          <DashboardSubheading title="Available Courses" />
          <Courses materials={materials} showCounter />
        </div>
      </WhiteArea>
    </div>
  );
};

export default Page;
