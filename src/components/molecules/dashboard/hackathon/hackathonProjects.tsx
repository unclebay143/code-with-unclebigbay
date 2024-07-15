'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Button } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import { EmptyState } from '../empty-state';
import HackathonProjectCard from './hackathonProjectCard';
import { useParams } from 'next/navigation';
import { HackathonProjectDetails } from '@/utils/types';

interface SubmittedHackathonsProjectsType {
  _id: string;
  name: string;
  description: string;
  project: HackathonProjectDetails;
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

  const PageLoader = () => (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="mx-auto w-12 h-12 border-4 border-slate-500 border-b-transparent rounded-full inline-block box-border animate-spin"></div>
    </div>
  );

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <section className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-4 justify-between md:flex-row-reverse md:items-center">
            <Button
              size="xs"
              appearance="secondary-slate"
              startIcon={ArrowLeft}
              asChild
            >
              <Link href={hackathonUrl || ''}>Back to hackathon</Link>
            </Button>
            <DashboardSubheading title={`Project Submissions for ${slug}`} />
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
            {showHackathonProjects ? (
              hackathonProjects.map(({ _id, name, description, project }) => (
                <HackathonProjectCard
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  project={project}
                  slug={slug}
                />
              ))
            ) : (
              <div className="text-xl text-center text-slate-600 mx-auto">
                <EmptyState label="No submission for this hackathon yet." />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
