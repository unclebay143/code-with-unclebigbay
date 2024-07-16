'use client';

import HackathonProjectPreview from '@/components/molecules/dashboard/hackathon/hackathonProjectPreview';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';

const PreviewedHackathonProject = () => {
  return (
     <WhiteArea border>
      <HackathonProjectPreview />
    </WhiteArea>
  );
};

export default PreviewedHackathonProject;
