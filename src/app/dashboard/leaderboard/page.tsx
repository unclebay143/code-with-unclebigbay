'use client';

import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/dashboard/white-area';
import { Button } from '@/components/ui/Button';
import { communityMember, communityMembers } from '@/lib/constants';
import Image from 'next/image';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-3">
        <DashboardSubheading title="Leaderboard" />
        {/* <EmptyState label="Top 10 students will appear here" /> */}
        <section className="flex flex-col gap-3 overflow-x-scroll sm:overflow-hidden">
          <div className="flex items-center justify-between pr-5 py-3 rounded-lg text-sm min-w-[300px]">
            <div className="flex items-center gap-3 text-lg flex-wrap w-[300px] md:w-full">
              <Button size="xs">Frontend</Button>
              <Button appearance="secondary-slate" size="xs">
                Backend
              </Button>
              <Button appearance="secondary-slate" size="xs">
                Fullstack
              </Button>
              <Button appearance="secondary-slate" size="xs">
                🇳🇬
              </Button>
              <Button appearance="secondary-slate" size="xs">
                🇬🇧
              </Button>
              <Button appearance="secondary-slate" size="xs">
                🇨🇮
              </Button>
            </div>
            <h3 className="font-medium">Points</h3>
          </div>
          {communityMembers.map(
            ({ name, totalScore, flag, photo, stack }, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-50 p-3 px-5 border rounded-lg min-w-[300px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-opacity-[1] text-slate-400 font-medium">
                      #{index + 1}
                    </span>
                    <div className="relative rounded-full h-8 w-8 overflow-hidden">
                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="64px"
                      height="64px"
                      viewBox="0 0 80 80"
                      version="1.1"
                    >
                      <defs>
                        <linearGradient
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                          id="g"
                        >
                          <stop stopColor="#e006f9" offset="0%" />
                          <stop stopColor="#f9e006" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect
                          id="Rectangle"
                          fill="url(#g)"
                          x={0}
                          y={0}
                          width={80}
                          height={80}
                        />
                      </g>
                    </svg> */}
                      <Image fill src={photo} alt="" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-950">{name}</h3>
                      <div className="flex items-center gap-2">
                        {stack && (
                          <h3 className="font-medium capitalize text-sm text-slate-600">
                            {stack}
                          </h3>
                        )}
                        {flag && <h3 className="font-medium">{flag}</h3>}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center h-6 px-1 bg-slate-100 text-slate-500 rounded-full">
                      <span className="text-xs font-medium">{totalScore}</span>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </section>
      </div>
    </WhiteArea>
  );
};

export default Page;
