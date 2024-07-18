'use client';

import { useParams } from 'next/navigation';
import { YTVideo } from '@/components/atoms/YTVideo';
import Link from 'next/link';
import {
  ArrowExternalLink01,
  ArrowLeft,
  Badge,
  Button,
} from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import { Github, IconButton } from '@hashnode/matrix-ui';
import Image from 'next/image';
import { ShareHackathonButton } from '../share-hackathon-project';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useEffect } from 'react';
import {
  HackathonProjectDetails,
  HackathonStudentDetails,
} from '@/utils/types';
import { sectionHeadingStyle } from '@/utils/style';

interface PreviewProjectsType {
  _id: string;
  name: string;
  feedback: string;
  createdAt: string;
  project: HackathonProjectDetails;
  student: HackathonStudentDetails;
  hackathon: { name: string; hashTag: string; slug: string };
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
        console.log(data);
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
      <div className="flex flex-col items-start gap-4 justify-between xl:flex-row-reverse">
        <div className="w-full flex justify-between xl:flex-row-reverse xl:w-auto xl:items-center gap-3">
          <Button
            size="xs"
            appearance="secondary-slate"
            startIcon={ArrowLeft}
            asChild
          >
            <Link href={hackathonUrl || ''}>View all projects</Link>
          </Button>
          <a
            target="_blank"
            rel="noopener"
            href={projectPreview?.project?.repositoryUrl}
          >
            <IconButton Icon={Github} appearance="secondary" size="md" />
          </a>
        </div>
        <section
          className="text-2xl xl:max-w-[600px]"
          title={projectPreview?.project.name}
        >
          <DashboardSubheading
            title={
              'Introducing the best app in the world to be the first one ahead of time' ??
              ''
            }
          />
        </section>
      </div>

      <div className="space-y-4 mt-2">
        <h3 className={sectionHeadingStyle}>Project Demo</h3>
        <div>
          <div className="relative">
            <YTVideo ytVideoId={projectPreview?.project?.demoUrl ?? ''} />
            <div className="absolute z-10 inset-0 w-full h-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h3 className={sectionHeadingStyle}>
          {/* About {projectPreview?.project?.name || ''} */}
          Project Description
        </h3>
        <p className="text-slate-500">
          {projectPreview?.project?.description || ''}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4">
        <h3 className={sectionHeadingStyle}>Collaborators (2)</h3>
        <div className="flex items-center gap-2">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={projectPreview?.student?.photo}
              alt={projectPreview?.student?.fullName}
              width={100}
              height={100}
            />
          </div>

          <div className="capitalize flex flex-col gap-0.5">
            <div className="flex flex-col">
              <p className="text-slate-700 text-lg font-medium -mb-0.5">
                {projectPreview?.student?.fullName}
              </p>
              <span className="text-xs text-slate-500">owner</span>
            </div>
            <p className="text-slate-600 text-xs">
              {projectPreview?.student?.stack}
            </p>
          </div>
        </div>
      </div>

      {projectPreview?.feedback && (
        <div className="flex flex-col items-start gap-2">
          <h3 className={sectionHeadingStyle}>Collaborator&apos;s Feedback</h3>
          <p className="text-slate-500">{projectPreview?.feedback || ''}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className={sectionHeadingStyle}>Links</h3>
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="flex gap-3 md:gap-2 flex-wrap">
            <Button size="sm" appearance="primary-slate">
              <a
                target="_blank"
                rel="noopener"
                href={projectPreview?.project?.url}
              >
                Live demo
              </a>
            </Button>
            <Button
              size="sm"
              appearance="secondary-slate"
              endIcon={ArrowExternalLink01}
              asChild
            >
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
      </div>
      <section className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-slate-700">Hackathon:</span>
          <Badge>{projectPreview?.hackathon.hashTag}</Badge>
        </div>
        <p className="text-slate-600 text-xs">
          Project submitted: {dayjs(projectPreview?.createdAt).fromNow()}{' '}
        </p>
      </section>
    </section>
  );
};

export default HackathonProjectPreview;
