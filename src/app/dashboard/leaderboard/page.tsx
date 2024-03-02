'use client';

import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
// import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Button } from '@/components/atoms/Button';
import { communityMember, communityMembers } from '@/utils/dummy-data';
import { MoreHorizontal, Trophy } from 'lucide-react';
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
          <div className="flex items-center py-3 rounded-lg text-sm">
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
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {communityMembers
              .slice(0, 3)
              .map(
                (
                  { name, username, totalScore, flag, photo, stack, rank },
                  index,
                ) => {
                  return (
                    <Link
                      href=""
                      key={index}
                      className="relative flex flex-col items-center justify-center gap-3 border rounded-lg p-5"
                    >
                      <div className="absolute left-3 top-3">
                        {rank === 1 ? (
                          <p className="rounded-full bg-slate-100 py-3 px-3 text-slate-600">
                            <Trophy size={24} />
                          </p>
                        ) : (
                          <p className="font-bold text-xl rounded-full bg-slate-100 py-1 px-3 text-slate-600">
                            {rank}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative rounded-full h-10 w-10 overflow-hidden">
                          <Image src={photo} alt="" fill />
                        </div>
                      </div>
                      <div className="text-center capitalize">
                        <p className="text-slate-700 font-semibold">{name}</p>
                        <p className="text-slate-500 text-sm">
                          {stack}
                          {flag}
                        </p>
                        <p className="text-slate-500 text-sm font-medium">
                          {totalScore}
                        </p>
                      </div>
                    </Link>
                  );
                },
              )}
          </div>
          {communityMembers
            .slice(3, 10)
            .map(
              (
                { name, username, totalScore, flag, photo, stack, rank },
                index,
              ) => {
                return (
                  <LeaderboardCard
                    rank={rank}
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
            rank={communityMember.rank}
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
