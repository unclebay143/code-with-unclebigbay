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

    const { hackathon } = await result.json();
    const hackathonId = hackathon._id;
    const isRegisteredUrl = `${baseURL}/api/hackathons/is-registered/${hackathonId}`;
    const hasSubmittedUrl = `${baseURL}/api/hackathons/has-submitted/${hackathonId}`;
    const isRegisteredResult = await fetch(isRegisteredUrl, {
      headers: headers(),
    });
    const hasSubmittedResult = await fetch(hasSubmittedUrl, {
      headers: headers(),
    });

    const { isRegistered } = await isRegisteredResult.json();
    const { hasSubmitted } = await hasSubmittedResult.json();
    return { hackathon, isRegistered, hasSubmitted };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const hackathonSlug = params.slug;
  const { hackathon, isRegistered, hasSubmitted } =
    (await getAllHackathonBySlug(hackathonSlug)) as {
      hackathon: Hackathon;
      isRegistered: boolean;
      hasSubmitted: boolean;
    };

  return (
    <HackathonStory
      hackathon={hackathon}
      isRegistered={isRegistered}
      hasSubmitted={hasSubmitted}
    />
  );
};

export default Page;
