'use client';

import { YTVideo } from '@/components/atoms/YTVideo';
import Link from 'next/link';
import {
  ArrowExternalLink01,
  ArrowLeft,
  Badge,
  Button,
  EmptyState,
  BookDocument,
} from '@hashnode/matrix-ui';
import { DashboardSubheading } from '../dashboard-subheading';
import { Github, IconButton } from '@hashnode/matrix-ui';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EmptyStateContainer } from '@/components/molecules/dashboard/EmptyStateContainer';
import {
  HackathonProject,
  HackathonParticipant,
  HackathonType,
  HackathonProjectMembers,
} from '@/utils/types';
import { sectionHeadingStyle } from '@/utils/style';
import { DEFAULT_PROFILE_PHOTO } from '@/utils';
import { ShareButton } from '@/components/ui/share-button';
import { baseURL } from '../../../../../frontend.config';

interface PreviewProjectsType {
  _id: string;
  name: string;
  slug: string;
  feedback: string;
  createdAt: string;
  project: HackathonProject;
  student: HackathonParticipant;
  hackathon: HackathonType;
  members: HackathonProjectMembers;
}

interface HackathonProjectPreviewProps {
  gethackathonRes: PreviewProjectsType;
  getCurrentStudentRes: { student: HackathonParticipant } | undefined;
}

dayjs.extend(relativeTime);

const HackathonProjectPreview = ({
  gethackathonRes,
  getCurrentStudentRes,
}: HackathonProjectPreviewProps) => {
  const projectPreview = gethackathonRes;

  const projectId = projectPreview?._id;
  const projectHashTag = projectPreview?.hackathon.hashTag;
  const authorUserName = projectPreview?.student.username;
  const currentLoggedInUserName = getCurrentStudentRes?.student.username;

  const hasMembers =
    projectPreview?.members && projectPreview?.members.length > 0;
  const membersCount = hasMembers ? projectPreview.members.length : 0;

  const showUrlNotFound = !projectPreview && !projectId;

  const hackathonUrl = `${baseURL}/hackathons/${projectPreview?.hackathon.slug}`;
  const hackathonSubmissionsUrl = `${baseURL}/hackathons/${projectPreview?.hackathon.slug}/submissions`;

  // show links section when there's at least 1 link
  const showLinkSection =
    projectPreview?.project?.url || projectPreview?.project?.articleUrl;

  const projectUrl = `https://www.codewithunclebigbay.com/hackathons/${projectPreview?.hackathon.slug}/submissions/${projectId}`;

  const shareMessage =
    authorUserName === currentLoggedInUserName
      ? `Yay 🎉 Checkout my submission for the ${projectHashTag} hackathon. ${projectUrl} #codewithunclebigbay`
      : `Check out this project submission from the ${projectHashTag} hackathon✨. ${projectUrl} #codewithunclebigbay`;

  return (
    <>
      {showUrlNotFound ? (
        <EmptyStateContainer>
          <EmptyState
            icon={BookDocument}
            title="Hackathon Project Not Found"
            copy={
              <>
                <p>
                  Oops! The hackathon project you&apos;re looking for
                  doesn&apos;t seem to exist.
                </p>
                <p>
                  Please check out the hackathon url or explore other available
                  hackathons.
                </p>
                <p>
                  If you need assistance, feel free to use the help centers.
                </p>
              </>
            }
            ctaElement={
              <Button size="xs" appearance="primary-slate">
                <Link href="/dashboard/hackathons">Explore hackathons</Link>
              </Button>
            }
          />
        </EmptyStateContainer>
      ) : (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-4 justify-between xl:flex-row-reverse">
            <div className="w-full flex justify-between xl:flex-row-reverse xl:w-auto xl:items-center gap-3">
              <Button
                size="xs"
                appearance="secondary-slate"
                startIcon={ArrowLeft}
                asChild
              >
                <Link href={hackathonSubmissionsUrl || ''}>
                  View all projects
                </Link>
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
              <DashboardSubheading title={projectPreview.project.name ?? ''} />
            </section>
          </div>

          <div className="space-y-4 mt-2">
            <h3 className={sectionHeadingStyle}>Project Demo</h3>
            <div>
              <YTVideo ytVideoId={projectPreview?.project?.demoUrl ?? ''} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className={sectionHeadingStyle}>Project Description</h3>
            <p
              className="text-slate-500"
              dangerouslySetInnerHTML={{
                __html: projectPreview?.project?.description,
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <h3 className={sectionHeadingStyle}>
              {' '}
              {hasMembers
                ? `Collaborators (${membersCount + 1})`
                : 'Collaborator'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <Link
                href={`/@${projectPreview?.student?.username}`}
                target="_blank"
                className="flex items-center gap-2 group"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={
                      projectPreview?.student?.photo || DEFAULT_PROFILE_PHOTO
                    }
                    alt="participant"
                    width={100}
                    height={100}
                  />
                </div>

                <div className="capitalize flex flex-col gap-0.5">
                  <div className="flex flex-col">
                    <p className="text-slate-700 group-hover:text-slate-700/90 text-lg font-medium -mb-0.5">
                      {projectPreview?.student?.fullName ||
                        projectPreview?.student?.username}
                    </p>
                    <span className="text-xs text-slate-500">owner</span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    {projectPreview?.student?.stack}
                  </p>
                </div>
              </Link>

              {hasMembers ? (
                <>
                  {projectPreview.members.map((member) => (
                    <Link
                      href={`/@${member.username}`}
                      target="_blank"
                      key={member._id}
                      className="flex items-center gap-2 group"
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={member?.photo || DEFAULT_PROFILE_PHOTO}
                          alt="participant"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="capitalize flex flex-col gap-0.5">
                        <div className="flex flex-col">
                          <p className="text-slate-700 group-hover:text-slate-700/90 text-md font-medium">
                            {member?.fullName}
                          </p>
                          <span className="text-xs text-slate-500">Member</span>
                        </div>
                        <p className="text-slate-600 text-xs">
                          {member?.stack}
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
          </div>

          {projectPreview?.feedback && (
            <div className="flex flex-col items-start gap-2">
              <h3 className={sectionHeadingStyle}>
                Collaborator&apos;s Feedback
              </h3>
              <p className="text-slate-500">
                {projectPreview?.feedback.toLowerCase() === 'null'
                  ? 'Thank you for hosting this hackathon 🙌'
                  : projectPreview?.feedback || ''}
              </p>
            </div>
          )}
          {showLinkSection && (
            <div className="flex flex-col gap-2">
              <h3 className={sectionHeadingStyle}>Links</h3>
              <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <div className="flex gap-3 md:gap-2 flex-wrap">
                  {projectPreview?.project?.url && (
                    <Button size="sm" appearance="primary-slate" asChild>
                      <a
                        target="_blank"
                        rel="noopener"
                        href={projectPreview?.project?.url}
                      >
                        Live demo
                      </a>
                    </Button>
                  )}
                  {projectPreview?.project?.articleUrl && (
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
                  )}
                </div>
                <ShareButton
                  placeholder="Share project"
                  copy={shareMessage}
                  slug={projectUrl}
                />
              </div>
            </div>
          )}
          <section className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-700">Hackathon:</span>
              <Link href={hackathonUrl}>
                <Badge>{projectPreview?.hackathon?.hashTag}</Badge>
              </Link>
            </div>
            <p className="text-slate-600 text-xs">
              Project submitted: {dayjs(projectPreview?.createdAt).fromNow()}{' '}
            </p>
          </section>
        </section>
      )}
    </>
  );
};

export default HackathonProjectPreview;
