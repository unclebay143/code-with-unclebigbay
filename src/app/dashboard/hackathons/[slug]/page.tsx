/* eslint-disable @next/next/no-img-element */

import { Hackathon } from '@/utils/types';
import { HackathonStory } from './HackathonStory';
import { getHackathonBySlug } from '@/utils/server.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hackathonSlug = params.slug;
  const hackathonRes = (await getHackathonBySlug(hackathonSlug)) as {
    hackathon: Hackathon;
  };

  return {
    title: hackathonRes.hackathon.title,
    description: hackathonRes.hackathon.brief,
    openGraph: {
      images: [hackathonRes.hackathon.ogImage],
    },
    keywords: [
      'hackathons',
      'hackathon',
      'Nigeria hackathon',
      'hackathon for beginners',
    ],
    alternates: {
      canonical: `/hackathons/${hackathonSlug}`,
    },
  };
}

const Page = async ({ params }: Props) => {
  const hackathonSlug = params.slug;
  const hackathonRes = (await getHackathonBySlug(hackathonSlug)) as {
    hackathon: Hackathon;
    isRegistered: boolean;
    hasSubmitted: boolean;
  };

  if (!hackathonRes) return notFound();

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
