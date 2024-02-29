'use client';

import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
// import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/dashboard/white-area';
import { Button } from '@/components/ui/Button';
import { communityMember, communityMembers } from '@/utils/dummy-data';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CommunityMember } from '../../../../types';

const LeaderboardCard = ({
  rank,
  photo,
  name,
  stack,
  flag,
  totalScore,
}: CommunityMember & { rank: string | number }) => {
  return (
    <div className="flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 p-3 px-5 border border-slate-200/75 rounded-lg min-w-[300px]">
      <div className="group flex items-center gap-2">
        <span className="text-2xl text-opacity-[1] text-slate-400 font-medium">
          #{rank}
        </span>
        <Link href="" className="relative rounded-full h-8 w-8 overflow-hidden">
          <Image fill src={photo} alt="" />
        </Link>
        <div>
          <Link
            href=""
            className="font-semibold text-slate-700 group-hover:underline"
          >
            {name}
          </Link>
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
};

const Page = () => {
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
            ({ name, username, totalScore, flag, photo, stack }, index) => {
              return (
                <LeaderboardCard
                  rank={index + 1}
                  username={username}
                  key={index}
                  photo={photo}
                  name={name}
                  stack={stack}
                  flag={flag}
                  totalScore={totalScore}
                />
              );
            },
          )}
          <div className="my-1 text-slate-600">
            <MoreHorizontal size={20} />
          </div>

          <LeaderboardCard
            rank="99"
            username={communityMember?.username}
            photo={communityMember?.photo}
            name={communityMember?.name}
            stack={communityMember?.stack}
            flag={communityMember?.flag}
            totalScore={communityMember?.totalScore}
          />
        </section>
      </div>
    </WhiteArea>
  );
};

export default Page;
