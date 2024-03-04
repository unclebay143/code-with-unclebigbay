'use client';

import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { YTVideo } from '@/components/atoms/YTVideo';
import { materials } from '@/utils/dummy-data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const { title, embedURL, description, coverImageUrl } = materials[0];
  const [showMore, setShowMore] = useState(false);
  const [startedCourse, setStartedCourse] = useState(false);

  const handleShowMoreVisibility = () => {
    setShowMore((prevVisibility) => !prevVisibility);
  };
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-1 text-xl text-slate-600">
          <DashboardSubheading title={title} />
          <Link href="/dashboard/help-centers">
            <IconButton Icon={HelpCircle} size="lg" />
          </Link>
        </div>
        {startedCourse ? (
          <section className="rounded overflow-hidden">
            <YTVideo embedURL={embedURL} />
          </section>
        ) : (
          <section
            className="relative flex justify-center items-center rounded overflow-hidden aspect-video bg-slate-5 bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${coverImageUrl})` }}
          >
            <div className="absolute bg-black/60 inset-0 w-full" />
            <div className="z-[1]">
              <Button
                onClick={() => setStartedCourse(true)}
                appearance="secondary-slate"
              >
                Start course
              </Button>
            </div>
          </section>
        )}
        <WhiteArea border>
          <button
            className="flex w-full items-center justify-between"
            onClick={handleShowMoreVisibility}
          >
            <span className="text-slate-600 font-medium">Course Details</span>
            <IconButton Icon={showMore ? ChevronUp : ChevronDown} size="xs" />
          </button>
          {showMore && (
            <section className="flex flex-col items-start gap-5 py-4 px-1">
              <div className="flex gap-5 flex-wrap">
                <div className="">
                  <h3 className="font-medium text-lg text-slate-700">
                    Description:
                  </h3>
                  <p className="text-slate-600">{description}</p>
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
                <div className="flex flex-wrap gap-5 w-full justify-between items-end">
                  <div className="">
                    <h3 className="font-medium text-lg text-slate-700">
                      Date Started:
                    </h3>
                    <p className="text-slate-600">May, 24, 2023</p>
                  </div>
                  <div className="">
                    <Button size="sm" asChild>
                      <Link href={'assignment/1'}>Attempt assignment</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </WhiteArea>
      </div>
    </WhiteArea>
  );
};

export default Page;
