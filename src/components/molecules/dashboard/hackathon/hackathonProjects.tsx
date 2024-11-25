'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Button,
  EmptyState,
  Stack,
  MinusCircle,
} from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import HackathonProjectCard from './hackathonProjectCard';
import { useParams } from 'next/navigation';
import {
  HackathonProject,
  HackathonParticipant,
  HackathonType,
} from '@/utils/types';
import { EmptyStateContainer } from '../EmptyStateContainer';
import { MarkdownRender } from './MarkdownRender';

interface HackathonProjectsType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  project: HackathonProject;
  student: HackathonParticipant;
  hackathon: HackathonType;
}

interface SubmittedHackathonsProjectsType {
  submissions: HackathonProjectsType[];
}

interface HackathonProjectsProps {
  gethackathonProjectsRes: SubmittedHackathonsProjectsType;
}
export default function HackathonProjects({
  gethackathonProjectsRes,
}: HackathonProjectsProps) {
  const { slug } = useParams<{ slug: string }>();

  const hackathonUrl = `/hackathons/${slug}`;
  const showHackathonProjects =
    gethackathonProjectsRes?.submissions &&
    gethackathonProjectsRes?.submissions.length > 0;

  const showHackathonNotFound = !gethackathonProjectsRes?.submissions;
  const showEmptyState = !showHackathonProjects && !showHackathonNotFound;

  const submissions = gethackathonProjectsRes?.submissions;
  const hackathonDetails = submissions?.[0].hackathon;
  const { name: hackathonName } = hackathonDetails || {};
  const submissionCount = submissions.length;
  const showSubmissionCount = submissionCount > 0;
  return (
    <>
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
            <DashboardSubheading
              title={`Project submissions for ${hackathonName} ${showSubmissionCount ? `(${submissions.length})` : null}`}
            />
          </div>
        </div>

        {showHackathonProjects && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
            {gethackathonProjectsRes.submissions.map(
              (hackathonProject: any) => (
                <HackathonProjectCard
                  key={hackathonProject._id}
                  {...hackathonProject}
                />
              ),
            )}
          </div>
        )}

        {showEmptyState && (
          <EmptyStateContainer className="max-h-[400px]">
            <EmptyState
              title="No project submitted for this hackathon yet."
              icon={Stack}
            />
          </EmptyStateContainer>
        )}

        {showHackathonNotFound && (
          <EmptyStateContainer>
            <EmptyState
              icon={MinusCircle}
              title="Hackathon Not Found"
              copy={
                <>
                  <p>
                    Oops! The hackathon projects you&apos;re looking for
                    doesn&apos;t seem to exist.
                  </p>
                  <p>
                    Please check out the hackathon url or explore our other
                    hackathons.
                  </p>
                  <p>
                    If you need assistance, feel free to use the help centers.
                  </p>
                </>
              }
              ctaElement={
                <Button size="xs" appearance="primary-slate">
                  <Link href="/hackathons">Checkout other hackathons</Link>
                </Button>
              }
            />
          </EmptyStateContainer>
        )}
      </section>
    </>
  );
}
