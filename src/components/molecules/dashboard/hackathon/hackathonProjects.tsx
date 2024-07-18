'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Button, EmptyState, Stack } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import HackathonProjectCard from './hackathonProjectCard';
import { useParams } from 'next/navigation';
import {
  HackathonProjectDetails,
  HackathonStudentDetails,
} from '@/utils/types';
import { EmptyStateContainer } from '../EmptyStateContainer';

interface SubmittedHackathonsProjectsType {
  _id: string;
  name: string;
  description: string;
  project: HackathonProjectDetails;
  student: HackathonStudentDetails;
}

export default function HackathonProjects() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [hackathonProjects, setHackathonProjects] = useState<
    SubmittedHackathonsProjectsType[]
  >([]);

  const fetchHackathonProjects = () => {
    fetch(`/api/hackathons/${slug}/submission`)
      .then((response) => response.json())
      .then((data) => {
        setHackathonProjects(data.hackathonSubmittedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching hackathon projects:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHackathonProjects();
  }, []);

  const hackathonUrl = `/dashboard/hackathons/${slug}`;
  const showHackathonProjects =
    hackathonProjects && hackathonProjects.length > 0;

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
          <DashboardSubheading title={`Project Submissions for ${slug}`} />
        </div>
      </div>
      {showHackathonProjects ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
          {hackathonProjects.map(
            ({ _id, name, description, project, student }) => (
              <HackathonProjectCard
                key={_id}
                _id={_id}
                name={name}
                description={description}
                project={project}
                slug={slug}
                student={student}
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
