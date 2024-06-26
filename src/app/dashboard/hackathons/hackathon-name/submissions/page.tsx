'use client';

import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import AllHackathons from '@/components/molecules/dashboard/hackathon/all-hacktons';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <WhiteArea border>
        <DashboardSubheading title="Hello, Checkout all our hackathons." />
      </WhiteArea>

      <AllHackathons />
    </WhiteArea>
  );
};

export default Page;
