import HackathonProjects from '@/components/molecules/dashboard/hackathon/hackathonProjects';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';
import { getHackathonProjects } from '@/utils/services/server/student.server';

type Props = { params: { slug: string } };

const Page = async ({ params }: Props) => {
  const { slug } = params;
  const gethackathonProjectsRes = await getHackathonProjects(slug);

  return (
    <WhiteArea border>
      <HackathonProjects gethackathonProjectsRes={gethackathonProjectsRes} />
    </WhiteArea>
  );
};

export default Page;
