'use client';

import Link from 'next/link';
import { ArrowLeft, Button, EmptyState, Stack } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import HackathonProjectCard from './hackathonProjectCard';
import { useParams } from 'next/navigation';
import { HackathonProject, HackathonParticipant,HackathonType } from '@/utils/types';
import { EmptyStateContainer } from '../EmptyStateContainer';

interface HackathonProjectsType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  project: HackathonProject;
  student: HackathonParticipant;
  hackathon:HackathonType
}

interface SubmittedHackathonsProjectsType {
  hackathonSubmittedProjects: HackathonProjectsType[];
}

interface HackathonProjectsProps {
  gethackathonProjectsRes: SubmittedHackathonsProjectsType;
}
export default function HackathonProjects({
  gethackathonProjectsRes,
}: HackathonProjectsProps) {
  const { slug } = useParams<{ slug: string }>();

  const hackathonUrl = `/dashboard/hackathons/${slug}`;
  const showHackathonProjects =
    gethackathonProjectsRes.hackathonSubmittedProjects &&
    gethackathonProjectsRes.hackathonSubmittedProjects.length > 0;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-4">
        <Button
          size="xs"
          appearance="secondary-slate"
          startIcon={ArrowLeft}
          asChild
        >
          <Link href={hackathonUrl || ''}>Overview</Link>
        </Button>
        <div className="text-xl text-slate-600">
          <DashboardSubheading title={`Project submissions for ${slug}`} />
        </div>
      </div>
      {showHackathonProjects ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
          {gethackathonProjectsRes.hackathonSubmittedProjects.map(
            (hackathonProject: any) => (
              <HackathonProjectCard
                key={hackathonProject._id}
                {...hackathonProject}
              />
            ),
          )}
        </div>
      ) : (
        <EmptyStateContainer className="max-h-[400px]">
          <EmptyState
            title="No project submitted for this hackathon yet."
            icon={Stack}
          />
        </EmptyStateContainer>
      )}
    </section>
  );
}
