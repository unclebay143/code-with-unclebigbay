'use client';

import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import {
  Button,
  ArrowExternalLink01,
  Badge,
  Users,
  IconButton,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRefresh,
  ArrowLeft,
  EmptyState,
  BookDocument,
} from '@hashnode/matrix-ui';
import { YTVideo } from '@/components/atoms/YTVideo';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCourseBySlug } from '@/components/hooks/useCourse';
import { Student, Tags } from '@/utils/types';
import { formatDate, formatTime, htmlParser } from '@/utils';
import { Tooltip } from '@/components/atoms/Tooltip';
import { EmptyStateContainer } from '@/components/molecules/dashboard/EmptyStateContainer';
import { AuthModal } from '@/components/atoms/AuthModal';
import { ShareButton } from '@/components/ui/share-button';
import { CommentSystem } from '@/components/ui/comment-system';
import {
  CATEGORY,
  CATEGORY_ID,
  COURSE_REPO,
  COURSE_REPO_ID,
} from '@/utils/consts/courses';

const Course = ({ currentStudent }: { currentStudent?: Student }) => {
  const [showMore, setShowMore] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const studentId = currentStudent?._id;

  const currentPathname = usePathname();
  const courseSlug = currentPathname.split('/').pop();

  const { course, isFetching, isRefetching, enroll, isEnrollingPending } =
    useCourseBySlug(courseSlug!);
  const courseId = course?._id;
  const isCompleted = course?.isCompleted;
  const completionDate = course?.completionDate;
  const isEnrolled = course?.isEnrolled;
  const hasAttemptedAssignment = course?.hasAttemptedAssignment;
  const enrolledDate = course?.enrolledDate;
  const enrolledStudentsCount = course?.enrolledStudentsCount;

  const isLoggedIn = !!currentStudent;
  const playableMode = !isLoggedIn || isEnrolled;

  const assignmentId = course?.assignment;
  const hasAssignment = !!assignmentId;

  const renderStartCourseCTA = `Sign in to enroll in this course${hasAssignment ? ' and access the assignment.' : '.'}`;

  const handleShowMoreVisibility = () => {
    setShowMore((prevVisibility) => !prevVisibility);
  };

  const showCourseNotFound = !isFetching && !course;
  const showCourse = (isRefetching && !!course) || (!isFetching && !!course);
  const tags = course?.tags as Tags;

  const handleEnroll = () => {
    if (studentId && courseId) {
      const payload = { studentId, courseId };
      enroll(payload);
    }
  };

  const assignmentBaseUrl = `/dashboard/courses/${courseSlug}/assignment/${assignmentId}`;

  const courseUrl = `https://www.codewithunclebigbay.com/courses/${course?.slug}`;

  const enrolledSharedMessage = `🎉 Just enrolled in an amazing course, '${course?.title}', by @unclebigbay143 on CodeWithUnclebigbay! Can't wait to dive in and start learning.\nJoin me! ${courseUrl} #codewithunclebigbay`;
  const notEnrolledSharedMessage = `📚 Excited to share this fantastic course, '${course?.title}' by @unclebigbay143, I found on CodeWithUnclebigbay! It's packed with valuable insights and knowledge.\nCheck it out! ${courseUrl} #codewithunclebigbay`;
  const shareCopy = isEnrolled
    ? enrolledSharedMessage
    : notEnrolledSharedMessage;

  return (
    <>
      {showCourseNotFound ? (
        <EmptyStateContainer>
          <EmptyState
            icon={BookDocument}
            title="Course Not Found"
            copy={
              <>
                <p>
                  Oops! The course you&apos;re looking for doesn&apos;t seem to
                  exist.
                </p>
                <p>
                  Please check the course url or explore our other available
                  courses.
                </p>
                <p>
                  If you need assistance, feel free to use the help centers.
                </p>
              </>
            }
            ctaElement={
              <Button size="xs" appearance="primary-slate">
                <Link href="/courses">Explore courses</Link>
              </Button>
            }
          />
        </EmptyStateContainer>
      ) : (
        <WhiteArea border>
          {showCourse ? (
            <div className="flex flex-col gap-5">
              <div className="flex justify-start lg:hidden">
                <Button
                  size="xs"
                  appearance="secondary-slate"
                  startIcon={ArrowLeft}
                  asChild
                >
                  <Link href="/dashboard/courses">All courses</Link>
                </Button>
              </div>
              <div className="flex items-start justify-between gap-1 text-xl text-slate-600">
                <div className="max-w-[90%]">
                  <DashboardSubheading as="h1" title={course.title} />
                </div>
                <Tooltip tooltip="Need help? Click me" asChild>
                  <a target="_blank" href="/dashboard/help-centers">
                    <IconButton Icon={HelpCircle} size="lg" />
                  </a>
                </Tooltip>
              </div>
              {playableMode ? (
                <section className="flex flex-col gap-2">
                  <section className="rounded overflow-hidden">
                    <YTVideo ytVideoId={course?.ytVideoId} />
                  </section>
                  {!isLoggedIn && (
                    <div className="flex  justify-between items-center flex-wrap gap-2">
                      <span className="text-sm text-orange-500">
                        {renderStartCourseCTA}
                      </span>
                      <div>
                        <Button
                          appearance="primary-slate"
                          size="xs"
                          onClick={() => setShowAuthModal(true)}
                        >
                          Sign in to enroll
                        </Button>
                      </div>
                    </div>
                  )}
                </section>
              ) : (
                <section
                  className="relative flex justify-center items-center rounded overflow-hidden aspect-video bg-slate-5 bg-no-repeat bg-center bg-cover"
                  style={{ backgroundImage: `url(${course?.coverImageUrl})` }}
                >
                  <div className="absolute bg-black/60 inset-0 w-full" />
                  <div className="z-[1] dark">
                    <Button
                      onClick={handleEnroll}
                      appearance="primary-slate"
                      disabled={isEnrollingPending || isRefetching}
                      startIcon={ArrowRefresh}
                      startIconClassName={
                        isEnrollingPending || isRefetching
                          ? 'animate-spin'
                          : 'hidden'
                      }
                    >
                      Start Learning
                    </Button>
                  </div>
                </section>
              )}
              <WhiteArea border>
                <div
                  className="group flex w-full items-center justify-between cursor-pointer"
                  onClick={handleShowMoreVisibility}
                >
                  <h2 className="text-slate-600 font-medium group-hover:text-slate-800">
                    Course Details
                  </h2>
                  <span className="group-hover:animate-pulse">
                    <IconButton Icon={showMore ? ChevronUp : ChevronDown} />
                  </span>
                </div>
                {showMore && (
                  <section className="flex flex-col items-start gap-5 py-4 px-1">
                    <div className="w-full flex flex-col gap-5 sm:gap-7 flex-wrap">
                      <div className="w-full flex flex-col items-start justify-between lg:flex-row lg:items-end gap-4">
                        {course?.description && (
                          <div>
                            <h3 className="font-medium text-lg text-slate-700">
                              Description:
                            </h3>
                            <div className="text-slate-600 flex flex-col gap-4 [&_a]:underline [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-5 [&_ul>li]:mb-2">
                              {htmlParser({ html: course?.description })}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-5 sm:gap-7">
                        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center">
                          <div>
                            <h3 className="font-medium text-lg text-slate-700">
                              Date Published:
                            </h3>
                            <p className="text-slate-600">
                              {formatDate(course.createdAt!)}
                            </p>
                          </div>
                          {isEnrolled && (
                            <hr className="hidden md:block h-10 border" />
                          )}
                          {isEnrolled && (
                            <div>
                              <h3 className="font-medium text-lg text-slate-700">
                                Date Enrolled:
                              </h3>
                              <p className="text-slate-600">
                                {formatDate(enrolledDate!)}
                              </p>
                            </div>
                          )}
                          <hr className="hidden md:block h-10 border" />
                          <div>
                            <h3 className="font-medium text-lg text-slate-700">
                              Duration:
                            </h3>
                            <p className="text-slate-600">
                              {formatTime(course.viewTime)}
                            </p>
                          </div>
                          <hr className="hidden md:block h-10 border" />
                          <div>
                            <h3 className="font-medium text-lg text-slate-700">
                              Status:
                            </h3>
                            <Badge
                              theme={`${isCompleted ? 'green' : isEnrolled ? 'yellow' : 'slate'}`}
                            >
                              {isCompleted
                                ? 'Completed'
                                : isEnrolled
                                  ? 'Enrolled'
                                  : 'Not enrolled'}
                            </Badge>
                          </div>
                          {isCompleted && (
                            <hr className="hidden md:block h-10 border" />
                          )}
                          {isEnrolled && isCompleted && (
                            <div>
                              <h3 className="font-medium text-lg text-slate-700">
                                Date Completed:
                              </h3>
                              <p className="text-slate-600">
                                {formatDate(completionDate!)}
                              </p>
                            </div>
                          )}
                        </div>

                        {enrolledStudentsCount !== 0 && (
                          <div className="flex items-center gap-2">
                            <Users size="md" solid />
                            <h3 className="font-medium text-lg text-slate-700">
                              Enrolled:
                            </h3>
                            <p className="text-slate-600 font-semibold text-sm">
                              {enrolledStudentsCount}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col items-start gap-5 justify-between sm:flex-row sm:items-center">
                          <ShareButton
                            copy={shareCopy}
                            slug={course.slug}
                            placeholder="Share course"
                          />
                          {hasAssignment && (
                            <>
                              {isEnrolled ? (
                                <>
                                  <Button
                                    size="sm"
                                    appearance="primary-slate"
                                    asChild
                                  >
                                    <Link
                                      href={
                                        hasAttemptedAssignment
                                          ? `${assignmentBaseUrl}/result`
                                          : assignmentBaseUrl
                                      }
                                    >
                                      {hasAttemptedAssignment
                                        ? 'View assignment score'
                                        : 'Attempt assignment'}
                                    </Link>
                                  </Button>
                                </>
                              ) : (
                                <Tooltip tooltip="Start course to attempt assignment">
                                  <Button
                                    size="sm"
                                    appearance="primary-slate"
                                    disabled
                                  >
                                    Attempt assignment
                                  </Button>
                                </Tooltip>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex flex-col-reverse items-start sm:flex-row gap-5 w-full justify-between sm:items-center">
                          {!(tags.length === 0) && (
                            <div className="flex flex-wrap gap-1 self-start">
                              {tags?.map(({ name, _id }) => (
                                <Badge key={_id} size="md">
                                  <span className="capitalize">{name}</span>
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div>
                            <Button
                              size="xs"
                              appearance="link-slate"
                              endIcon={ArrowExternalLink01}
                              asChild
                            >
                              <Link
                                href={`https://www.youtube.com/watch?v=${course?.ytVideoId}`}
                                target="_blank"
                                rel="noopener"
                              >
                                <span className="hidden sm:inline">
                                  Like and comment on YouTube
                                </span>
                                <span className="sm:hidden">
                                  Comment on YouTube
                                </span>
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <section className="flex flex-col gap-5 border-t pt-5">
                          <h3 className="font-medium text-lg text-slate-700">
                            Discussions
                          </h3>
                          <CommentSystem
                            mapping="title"
                            repo={COURSE_REPO}
                            repoId={COURSE_REPO_ID}
                            category={CATEGORY}
                            categoryId={CATEGORY_ID}
                            term={course.title}
                          />
                        </section>
                      </div>
                    </div>
                  </section>
                )}
              </WhiteArea>
            </div>
          ) : (
            <div className="flex flex-col gap-5 animate-pulse">
              <div className="flex items-center justify-between gap-52">
                <div className="bg-slate-50 w-full h-8 rounded" />
                <div className="bg-slate-50 w-1 h-1 p-5 rounded-full" />
              </div>

              <section className="rounded aspect-video bg-slate-50" />
              <section className="rounded-lg h-20 bg-slate-50" />
            </div>
          )}
        </WhiteArea>
      )}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          close={() => setShowAuthModal(false)}
          type="login"
          nextUrl={window.location.href}
        />
      )}
    </>
  );
};

export default Course;
