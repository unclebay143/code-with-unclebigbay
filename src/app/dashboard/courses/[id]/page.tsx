'use client';

import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { YTVideo } from '@/components/atoms/YTVideo';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCourseById } from '@/components/hooks/useCourse';
import { Tags } from '@/utils/types';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import axios from 'axios';
import { formatDate } from '@/utils';

const Page = () => {
  const [showMore, setShowMore] = useState(false);
  const [startedCourse, setStartedCourse] = useState<boolean>();

  const { data: currentStudent } = useCurrentStudent();
  const currentPathname = usePathname();
  const courseId = currentPathname.split('/').pop();
  const { course, isFetching } = useCourseById(courseId!);
  const isEnrolled = course?.isEnrolled;
  const enrolledDate = course?.enrolledDate;
  const enrolledStudentsCount = course?.enrolledStudents?.length || 0;

  const assignmentId = course?.assignment;
  const hasAssignment = !!assignmentId;

  const handleShowMoreVisibility = () => {
    setShowMore((prevVisibility) => !prevVisibility);
  };
  const showCourse = !isFetching && course;
  const tags = course?.tags as Tags;

  const handleEnroll = () => {
    const payload = { studentId: currentStudent?._id, courseId: course?._id };
    axios.post('/api/courses/enroll', payload).then((res) => {
      setStartedCourse(true);
    });
  };

  useEffect(() => {
    setStartedCourse(isEnrolled);
  }, [isEnrolled]);

  return (
    <>
      <WhiteArea border>
        {showCourse ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-1 text-xl text-slate-600">
              <DashboardSubheading title={course?.title} />
              <Link href="/dashboard/help-centers">
                <IconButton Icon={HelpCircle} size="lg" />
              </Link>
            </div>
            {startedCourse ? (
              <section className="rounded overflow-hidden">
                <YTVideo ytVideoId={course?.ytVideoId} />
              </section>
            ) : (
              <section
                className="relative flex justify-center items-center rounded overflow-hidden aspect-video bg-slate-5 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${course?.coverImageUrl})` }}
              >
                <div className="absolute bg-black/60 inset-0 w-full" />
                <div className="z-[1]">
                  <Button onClick={handleEnroll} appearance="secondary-slate">
                    Start Learning
                  </Button>
                </div>
              </section>
            )}
            <WhiteArea border>
              <button
                className="group flex w-full items-center justify-between"
                onClick={handleShowMoreVisibility}
              >
                <span className="text-slate-600 font-medium group-hover:text-slate-800">
                  Course Details
                </span>
                <span className="group-hover:animate-pulse">
                  <IconButton
                    Icon={showMore ? ChevronUp : ChevronDown}
                    size="xs"
                  />
                </span>
              </button>
              {showMore && (
                <section className="flex flex-col items-start gap-5 py-4 px-1">
                  <div className="w-full flex flex-col  gap-5 flex-wrap">
                    <div>
                      <h3 className="font-medium text-lg text-slate-700">
                        Description:
                      </h3>
                      <p className="text-slate-600">{course?.description}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-slate-700">
                        Date Published:
                      </h3>
                      <p className="text-slate-600">
                        {formatDate(course.createdAt!)}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-slate-700">
                        Status:
                      </h3>
                      <p className="text-slate-600">
                        {startedCourse ? 'Enrolled' : 'Not Started'}
                        {/* Completed, Enrolled, In Progress, Not Started */}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-slate-700">
                        Date Enrolled:
                      </h3>
                      <p className="text-slate-600">
                        {formatDate(enrolledDate!)}
                      </p>
                    </div>
                    {enrolledStudentsCount > 2 && (
                      <div>
                        <h3 className="font-medium text-lg text-slate-700">
                          Enrolled:
                        </h3>
                        <p className="text-slate-600">
                          {enrolledStudentsCount}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-5 w-full justify-between items-end">
                      {!(tags.length === 0) && (
                        <div className="flex flex-wrap gap-1">
                          {tags?.map(({ name, _id }) => (
                            <span
                              key={_id}
                              className="px-2 capitalize rounded-full bg-indigo-100/20 text-slate-600 text-sm border"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      )}
                      {hasAssignment && (
                        <div>
                          <Button size="sm" asChild>
                            <Link
                              href={`${courseId}/assignment/${assignmentId}`}
                            >
                              Attempt assignment
                            </Link>
                          </Button>
                        </div>
                      )}
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
