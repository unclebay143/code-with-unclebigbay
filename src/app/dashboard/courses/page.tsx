'use client';

import { Courses } from '@/components/dashboard/courses';
import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/dashboard/white-area';
import { materials } from '@/utils/dummy-data';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-5">
        <DashboardSubheading title="Available Courses" />
        <Courses materials={Array(50).fill(materials[0])} />
      </div>
    </WhiteArea>
  );
};

export default Page;
