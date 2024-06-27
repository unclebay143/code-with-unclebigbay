import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import DisplayHackathons  from '@/components/molecules/dashboard/hackathon/all-hacktons';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <section className="flex flex-col gap-5">
        <DisplayHackathons  />
      </section>
    </WhiteArea>
  );
};

export default Page;
