/* eslint-disable @next/next/no-img-element */

import { Hackathon } from '@/utils/types';
import { HackathonStory } from './HackathonStory';
import { baseURL } from '../../../../../frontend.config';
import { headers } from 'next/headers';

async function getAllHackathonBySlug(hackathonSlug: string) {
  try {
    const url = `${baseURL}/api/hackathons/${hackathonSlug}`;
    const result = await fetch(url, {
      headers: headers(),
    });
    const hackathons = await result.json();

    return hackathons;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const hackathonSlug = params.slug;
  const { hackathon } = (await getAllHackathonBySlug(hackathonSlug)) as {
    hackathon: Hackathon;
  };

  return <HackathonStory hackathon={hackathon} />;
};

export default Page;
