import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LeaderBoardData } from '@/utils/types';
import { MoreHorizontal, Trophy } from 'lucide-react';
import {
  getCurrentStudent,
  getLeaderBoard,
} from '@/utils/services/server/student.server';
// import { DotsHorizontal } from '@hashnode/matrix-ui';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaderboard - Dashboard',
};

const LeaderboardCard = ({
  rank,
  student,
  totalScore,
  position,
}: LeaderBoardData & { rank: number; position: number }) => {
  const { isAnonymous, photo, fullName, stack, username } = student || {};

  let isCurrentUser;

  if (position) {
    isCurrentUser = position === rank;
  }

  const Comp = isAnonymous ? 'div' : Link;
  const LinkAttributes = {
    href: `/@${username}`,
  };

  return (
    <div className="flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 p-3 px-5 border border-slate-200/75 rounded-lg min-w-[300px]">
      <div className="group flex items-center gap-2">
        <span className="text-2xl text-opacity-[1] text-slate-400 font-medium">
          #{rank}
        </span>
        {/* @ts-ignore */}
        <Comp
          {...(!isAnonymous && LinkAttributes)}
          className="relative rounded-full h-8 w-8 overflow-hidden"
        >
          {isAnonymous ? (
            <Image
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1707121372242/57c3ede2-19a1-4530-beec-fae5db66c6a2.png"
              alt="default profile"
              fill
            />
          ) : (
            <Image src={photo} alt={fullName} fill />
          )}
        </Comp>
        <div>
          {/* @ts-ignore */}
          <Comp
            {...(!isAnonymous && LinkAttributes)}
            className={`font-medium text-slate-600 ${isAnonymous ? '' : 'group-hover:underline'}`}
          >
            {isAnonymous ? 'Anonymous' : fullName || username}{' '}
            {isCurrentUser && '(you)'}
          </Comp>
          <div className="flex items-center gap-2">
            {stack && (
              <h3 className="font-medium capitalize text-sm text-slate-600">
                {stack}
              </h3>
            )}
            {/* {flag && <h3 className="font-medium">{flag}</h3>} */}
          </div>
        </div>
      </div>
      {totalScore && (
        <div className="flex items-center h-6 px-1 bg-slate-100 text-slate-500 rounded-full">
          <span className="text-xs font-medium">{totalScore}</span>
        </div>
      )}
    </div>
  );
};

const Page = async () => {
  const [studentRes, leaderboardRes] = await Promise.all([
    getCurrentStudent(),
    getLeaderBoard(),
  ]);

  if (!leaderboardRes) return null;

  const { leaderboard, position } = leaderboardRes;

  const isCurrentUserInTop10 = leaderboard.find(
    (leaderboard) => leaderboard.rank === position,
  );

  return (
    <WhiteArea border>
      <div className="flex flex-col gap-3">
        <DashboardSubheading title="Leaderboard" />
        {/* <EmptyState label="Top 10 students will appear here" /> */}
        {/*
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
          </div> */}
        <div className="grid md:grid-cols-3 gap-3">
          {leaderboard
            ?.slice(0, 3)
            ?.map(({ _id, student, totalScore, rank }) => {
              let isCurrentUser;

              if (position) {
                isCurrentUser = position === rank;
              }

              const { username, photo, fullName, isAnonymous, stack } = student;

              const Comp = isAnonymous ? 'div' : Link;
              const LinkAttributes = {
                href: `/@${username}`,
              };

              return (
                // @ts-ignore
                <Comp
                  {...(!isAnonymous && LinkAttributes)}
                  key={_id}
                  className="relative flex flex-col items-center justify-center gap-3 border border-slate-200 rounded-lg p-5 hover:bg-slate-5 hover:border-slate-300/80"
                >
                  <div className="absolute left-3 top-3">
                    {rank === 1 ? (
                      <p className="rounded-full border py-3 px-3 text-slate-600">
                        <Trophy size={24} />
                      </p>
                    ) : (
                      <p className="font-bold text-xl rounded-full border py-1 px-3 text-slate-600">
                        {rank}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative rounded-full h-12 w-12 overflow-hidden">
                      {isAnonymous ? (
                        <Image
                          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1707121372242/57c3ede2-19a1-4530-beec-fae5db66c6a2.png"
                          alt="default profile"
                          fill
                        />
                      ) : (
                        <Image src={photo} alt={fullName} fill />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-center capitalize text-slate-800">
                    <div className="flex flex-col">
                      <p className="font-semibold text-slate-900">
                        {isAnonymous ? 'Anonymous' : fullName || username}{' '}
                        {isCurrentUser && (
                          <span className="lowercase">(you)</span>
                        )}
                      </p>
                      <p className="text-sm font-semibold">
                        {stack}
                        {/* {flag} */}
                      </p>
                    </div>

                    <p className="text-xs font-medium">Points: {totalScore}</p>
                  </div>
                </Comp>
              );
            })}
        </div>
        {leaderboard?.slice(3, 10).map(({ totalScore, student, rank }) => {
          return (
            <LeaderboardCard
              key={student._id}
              rank={rank}
              totalScore={totalScore}
              student={student}
              position={position}
            />
          );
        })}

        {position && studentRes?.student && !isCurrentUserInTop10 && (
          <>
            <div className="my-1 text-slate-600">
              <MoreHorizontal size={14} />
            </div>

            <LeaderboardCard
              rank={position}
              student={studentRes?.student}
              totalScore={studentRes?.student?.totalScore}
              position={position}
            />
          </>
        )}
      </div>
    </WhiteArea>
  );
};

export default Page;
