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
import { useState, useEffect } from 'react';
import { HackathonProjectDetails } from '@/utils/types';

interface PreviewProjectsType {
  _id: string;
  name: string;
  feedback: string;
  createdAt: string;
  project: HackathonProjectDetails;
}

const HackathonProjectPreview = () => {
  const { _id, slug } = useParams<{ slug: string; _id: string }>();
  dayjs.extend(relativeTime);
  const [loading, setLoading] = useState(true);
  const [projectPreview, setProjectPreview] =
    useState<PreviewProjectsType | null>(null);

  const getHackathonProjectById = async (_id: string) => {
    try {
      const res = await fetch(`/api/hackathons/${slug}/submission/${_id}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Error found while fetching');
      }
      return res.json();
    } catch (error) {
      console.error('Error loading data', error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const data = await getHackathonProjectById(_id as string);
      if (data) {
        setProjectPreview(data.submittedHackathonProject);
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  useEffect(() => {
    if (_id) {
      fetchData();
    }
  }, [_id]);

  const hackathonUrl = `/dashboard/hackathons/${slug}/submissions`;
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 justify-between md:flex-row-reverse md:items-center">
        <div className="flex flex-row-reverse items-center gap-5 lg:flex-row">
          <a
            target="_blank"
            rel="noopener"
            href={projectPreview?.project?.repositoryUrl}
          >
            <IconButton Icon={Github} appearance="secondary" size="md" />
          </a>
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
        <YTVideo
          ytVideoId={projectPreview?.project?.demoUrl ?? ''}
          removeRounded
        />
        <div className="absolute z-10 inset-0 w-full h-full" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-gray-700 text-lg font-medium">
          About {projectPreview?.project?.name || '...'}
        </h1>
        <p>{projectPreview?.project?.description || 'Loading'}</p>
      </div>
      {projectPreview?.feedback && (
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-gray-700 text-lg  font-medium">Feedback</h1>
        <p>{projectPreview?.feedback || 'Loading'}</p>
      </div>
        )}
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
            <a
              target="_blank"
              rel="noopener"
              href={projectPreview?.project?.url}
            >
              Live demo
            </a>
          </Button>
          <Button size="sm" appearance="secondary-slate">
            <a
              target="_blank"
              rel="noopener"
              href={projectPreview?.project?.articleUrl}
            >
              Read launch article
            </a>
          </Button>
        </div>
        <ShareHackathonButton />
      </div>
      <p className="text-gray-400 text-xs">
        Project Submitted: {dayjs(projectPreview?.createdAt).fromNow()}{' '}
      </p>
    </section>
  );
};

export default HackathonProjectPreview;
