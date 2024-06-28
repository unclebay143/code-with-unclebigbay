'use client';

import { submittedHackathons } from '@/utils/consts/all-hackathons';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Button } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import { EmptyState } from '../empty-state';
import HackathonProjectCard from './hackathonProjectCard';

export default function HackathonProjects() {
  const [hackathonProject, setHackathonProject] = useState(submittedHackathons);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-4 justify-between md:flex-row-reverse md:items-center">
        <Button
          size="xs"
          appearance="secondary-slate"
          startIcon={ArrowLeft}
          asChild
        >
          <Link href="/dashboard/courses">Back to hackathon</Link>
        </Button>
        <DashboardSubheading title="Project Submissions for 'Build for Business Hackathon'" />
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
        {hackathonProject && hackathonProject.length > 0 ? (
          hackathonProject.map(({ id, name, description, project }) => (
            <HackathonProjectCard
              key={id}
              id={id}
              name={name}
              description={description}
              project={project}
            />
          ))
        ) : (
          <div className="text-xl text-center text-slate-600">
            <EmptyState label="   no submission for this hackathon yet." />
          </div>
        )}
      </div>
    </section>
  );
}
