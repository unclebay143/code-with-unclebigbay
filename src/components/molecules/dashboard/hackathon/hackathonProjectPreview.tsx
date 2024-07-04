'use client';

import { useParams } from 'next/navigation';
import { YTVideo } from '@/components/atoms/YTVideo';
import Link from 'next/link';
import { ArrowLeft, Button } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import { Github, IconButton } from '@hashnode/matrix-ui';
import Image from 'next/image';
import { ShareHackathonButton } from '../share-hackathon-project';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const HackathonProjectPreview = () => {
  const { id } = useParams();
  dayjs.extend(relativeTime);
  const submittedDate = Date.now()

  console.log(id);
  const hackathonUrl = '';
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 justify-between md:flex-row-reverse md:items-center">
        <div className="flex flex-row-reverse items-center gap-5 lg:flex-row">
          <Link
            target="_blank"
            rel="noopener"
            href="https://github.com/eedrisofficial/ZURI-ASSIGNMENT/tree/main/Week%201"
          >
            <IconButton Icon={Github} appearance="secondary" size="md" />
          </Link>
          <Button
            size="xs"
            appearance="secondary-slate"
            startIcon={ArrowLeft}
            asChild
          >
            <Link href={hackathonUrl || ''}>View All Projects</Link>
          </Button>
        </div>
        <DashboardSubheading title="Idris Haruna Hackathon Project Overview" />
      </div>
      <div className="relative">
        <YTVideo ytVideoId="4wblm-X0rEc" removeRounded />
        <div className="absolute z-10 inset-0 w-full h-full" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-gray-700 text-lg font-medium">
          About FashionWave
          {/* the name fashionwave represent the project name which will be fectch from DB  */}
        </h1>
        <p>
          This project aims to bridge the gap between barbers and customers
          within their community. Our website allows customers to order home
          services, choose their preferred styles before the barbers arrival,
          and know the exact costs upfront. Additionally, barbers can easily
          locate customers in their vicinity who need their services. This
          seamless connection enhances the convenience and accessibility of
          quality grooming services for everyone involved.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-gray-700 text-lg  font-medium">Feedback</h1>
        <p>
          It was an incredible experience. The event was well-organized, with
          clear instructions and timely support from the organizers. The diverse
          range of workshops and mentorship sessions provided valuable insights
          and guidance
        </p>
      </div>

      <div className="flex items-start gap-2">
        <div className="h-16 w-16 overflow-hidden rounded-full">
          <Image
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg"
            alt="Unclebigbay"
            width={100}
            height={100}
          />
        </div>
        <div>
          <Link
            href="https://idris.com"
            className="text-gray-700 text-lg font-medium hover:underline"
          >
            Idris Haruna
            {/* the name fashionwave represent the project name which will be fectch from DB  */}
          </Link>
          <p className="text-gray-600 text-sm">Frontend developer</p>
        
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between gap-3 lg:flex-row lg:items-center">
        <div className="flex gap-2">
          <Button size="sm" appearance="primary-slate">
            <a target="_blank" rel="noopener" href="https://dub.sh/GmBzY6T">
              Live demo
            </a>
          </Button>
          <Button size="sm" appearance="secondary-slate">
            <a target="_blank" rel="noopener" href="https://dub.sh/GmBzY6T">
              Read launch article
            </a>
          </Button>
        </div>
        <ShareHackathonButton />
      </div>
        <p className="text-gray-400 text-xs">Project Submitted: {dayjs(submittedDate).fromNow()} </p>

    </section>
  );
};

export default HackathonProjectPreview;
