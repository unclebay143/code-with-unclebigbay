'use client';

import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { YTVideo } from '@/components/atoms/YTVideo';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMaterialById } from '@/components/hooks/useMaterial';
import { Tags } from '@/utils/types';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import axios from 'axios';

const Page = () => {
  const [showMore, setShowMore] = useState(false);
  const [startedCourse, setStartedCourse] = useState(false);

  const { data: currentStudent } = useCurrentStudent();
  const currentPathname = usePathname();
  const courseId = currentPathname.split('/').pop();

  const { material, isFetching } = useMaterialById(courseId!);
  const assignmentId = material?.assignment;
  const hasAssignment = !!assignmentId;

  const handleShowMoreVisibility = () => {
    setShowMore((prevVisibility) => !prevVisibility);
  };
  const showCourse = !isFetching && material;
  const tags = material?.tags as Tags;

  const handleEnroll = () => {
    const payload = { studentId: currentStudent?._id, courseId: material?._id };
    axios.post('/api/materials/enroll', payload).then((res) => {
      console.log(res.data);
      setStartedCourse(true);
    });
  };

  return (
    <>
      <WhiteArea border>
        {showCourse ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-1 text-xl text-slate-600">
              <DashboardSubheading title={material?.title} />
              <Link href="/dashboard/help-centers">
                <IconButton Icon={HelpCircle} size="lg" />
              </Link>
            </div>
            {startedCourse ? (
              <section className="rounded overflow-hidden">
                <YTVideo ytVideoId={material?.ytVideoId} />
              </section>
            ) : (
              <section
                className="relative flex justify-center items-center rounded overflow-hidden aspect-video bg-slate-5 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${material?.coverImageUrl})` }}
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
                    <div className="">
                      <h3 className="font-medium text-lg text-slate-700">
                        Description:
                      </h3>
                      <p className="text-slate-600">{material?.description}</p>
                    </div>
                    <div className="">
                      <h3 className="font-medium text-lg text-slate-700">
                        Status:
                      </h3>
                      <p className="text-slate-600">
                        {startedCourse ? 'In Progress' : 'Not Started'}
                        {/* Completed, Enrolled, In Progress, Not Started */}
                      </p>
                    </div>
                    {/* Show date when student started course here */}
                    {/* <div className="">
                      <h3 className="font-medium text-lg text-slate-700">
                        Date Started:
                      </h3>
                      <p className="text-slate-600">
                        {new Intl.DateTimeFormat('en-GB', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(material.createdAt!))}
                      </p>
                    </div> */}
                    <div className="flex flex-wrap gap-5 w-full justify-between items-start">
                      <div className="">
                        <h3 className="font-medium text-lg text-slate-700">
                          Date Published:
                        </h3>
                        <p className="text-slate-600">
                          {new Intl.DateTimeFormat('en-GB', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }).format(new Date(material.createdAt!))}
                        </p>
                      </div>
                      {hasAssignment && (
                        <div className="">
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
