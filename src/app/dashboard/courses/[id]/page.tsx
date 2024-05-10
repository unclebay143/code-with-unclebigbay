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
} from '@hashnode/matrix-ui';
import { YTVideo } from '@/components/atoms/YTVideo';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCourseById } from '@/components/hooks/useCourse';
import { Tags } from '@/utils/types';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { formatDate } from '@/utils';
import { Tooltip } from '@/components/atoms/Tooltip';
import { handleAuthentication } from '@/utils/auth';

const Page = () => {
  const [showMore, setShowMore] = useState(false);

  const { data: currentStudent } = useCurrentStudent();
  const studentId = currentStudent?._id;

  const currentPathname = usePathname();
  const courseId = currentPathname.split('/').pop();

  const { course, isFetching, isRefetching, enroll, isEnrollingPending } =
    useCourseById(courseId!);
  const isCompleted = course?.isCompleted;
  const completionDate = course?.completionDate;
  const isEnrolled = course?.isEnrolled;
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
  const showCourse = (isRefetching && !!course) || (!isFetching && !!course);
  const tags = course?.tags as Tags;

  const handleEnroll = () => {
    if (studentId && courseId) {
      const payload = { studentId, courseId };
      enroll(payload);
    }
  };

  return (
    <>
      <WhiteArea border>
        {showCourse ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-1 text-xl text-slate-600">
              <div className="max-w-[90%]">
                <DashboardSubheading title={course.title} />
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
                        onClick={() =>
                          handleAuthentication({
                            nextUrl: window.location.href,
                          })
                        }
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
                    disabled={isEnrollingPending}
                    startIcon={ArrowRefresh}
                    startIconClassName={
                      isEnrollingPending ? 'animate-spin' : 'hidden'
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
                <span className="text-slate-600 font-medium group-hover:text-slate-800">
                  Course Details
                </span>
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
                          <p className="text-slate-600">
                            {course?.description}
                          </p>
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

                      <div className="flex justify-end">
                        {hasAssignment && (
                          <div>
                            {isEnrolled ? (
                              <Button
                                size="sm"
                                appearance="primary-slate"
                                asChild
                              >
                                <Link
                                  href={`${courseId}/assignment/${assignmentId}`}
                                >
                                  Attempt assignment
                                </Link>
                              </Button>
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
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row gap-5 w-full justify-between items-end">
                        {!(tags.length === 0) && (
                          <div className="flex flex-wrap gap-1 self-start">
                            {tags?.map(({ name, _id }) => (
                              <Badge key={_id} size="md">
                                <span className="capitalize">{name}</span>
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Button
                          size="xs"
                          appearance="secondary-slate"
                          endIcon={ArrowExternalLink01}
                          asChild
                        >
                          <Link
                            href={`https://www.youtube.com/watch?v=${course?.ytVideoId}`}
                            target="_blank"
                            rel="noopener"
                          >
                            Like and comment on YouTube
                          </Link>
                        </Button>
                        {/* </div> */}
                      </div>
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
    </>
  );
};

export default Page;
