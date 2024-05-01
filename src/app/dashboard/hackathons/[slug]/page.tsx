/* eslint-disable @next/next/no-img-element */

import { Hackathon } from '@/utils/types';
import { HackathonStory } from './HackathonStory';
import { getHackathonBySlug } from '@/utils/server.service';

const Page = async ({ params }: { params: { slug: string } }) => {
  const hackathonSlug = params.slug;
  const hackathonRes = (await getHackathonBySlug(hackathonSlug)) as {
    hackathon: Hackathon;
    isRegistered: boolean;
    hasSubmitted: boolean;
  };

  const { hackathon, isRegistered, hasSubmitted } = hackathonRes;

  return (
    <HackathonStory
      hackathon={hackathon}
      isRegistered={isRegistered}
      hasSubmitted={hasSubmitted}
    />
  );
};

export default Page;
