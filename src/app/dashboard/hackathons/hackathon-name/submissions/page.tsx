import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import AllHackathons from '@/components/molecules/dashboard/hackathon/all-hacktons';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <section className="flex flex-col gap-5">
        <AllHackathons />
      </section>
    </WhiteArea>
  );
};

export default Page;
