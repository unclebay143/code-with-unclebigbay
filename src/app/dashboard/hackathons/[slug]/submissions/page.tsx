import HackathonSubmissionProjects from '@/components/molecules/dashboard/hackathon/all-hacktons';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <HackathonSubmissionProjects />
    </WhiteArea>
  );
};

export default Page;
