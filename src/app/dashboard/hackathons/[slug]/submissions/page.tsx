import HackathonProjects from '@/components/molecules/dashboard/hackathon/hackathonProjects';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <HackathonProjects />
    </WhiteArea>
  );
};

export default Page;
