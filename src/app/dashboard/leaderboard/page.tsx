import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LeaderBoard, LeaderBoardData } from '@/utils/types';
import { Trophy } from 'lucide-react';
import { getLeaderBoard } from '@/utils/server.service';

const LeaderboardCard = ({
  rank,
  student,
  totalScore,
}: LeaderBoardData & { rank: number }) => {
  return (
    <div className="flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 p-3 px-5 border border-slate-200/75 rounded-lg min-w-[300px]">
      <div className="group flex items-center gap-2">
        <span className="text-2xl text-opacity-[1] text-slate-400 font-medium">
          #{rank}
        </span>
        <Link href="" className="relative rounded-full h-8 w-8 overflow-hidden">
          <Image fill src={student.photo} alt="" />
        </Link>
        <div>
          <Link
            href=""
            className="font-medium text-slate-600 group-hover:underline"
          >
            {student.fullName}
          </Link>
          <div className="flex items-center gap-2">
            {student.stack && (
              <h3 className="font-medium capitalize text-sm text-slate-600">
                {student.stack}
              </h3>
            )}
            {/* {flag && <h3 className="font-medium">{flag}</h3>} */}
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

const Page = async () => {
  const { leaderboard, position } = (await getLeaderBoard()) as {
    leaderboard: LeaderBoard;
    position: number;
  };

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

              return (
                <Link
                  key={_id}
                  href={`/@${student.username}`}
                  target="_blank"
                  className="relative flex flex-col items-center justify-center gap-3 border rounded-lg p-5 hover:bg-slate-50"
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
                      <Image src={student.photo} alt="" fill />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-center capitalize text-slate-800">
                    <div className="flex flex-col">
                      <p className="font-extrabold">
                        {student.fullName}{' '}
                        {isCurrentUser && (
                          <span className="lowercase">(you)</span>
                        )}
                      </p>
                      <p className="text-sm font-semibold">
                        {student.stack}
                        {/* {flag} */}
                      </p>
                    </div>

                    <p className="text-xs font-medium">Points: {totalScore}</p>
                  </div>
                </Link>
              );
            })}
        </div>
        {leaderboard?.slice(3, 10).map(({ totalScore, student, rank }) => {
          return (
            <LeaderboardCard
              key={student._id}
              rank={rank} // let this come from backend
              totalScore={totalScore}
              student={student}
            />
          );
        })}

        {/* {session && (
            <>
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
            </>
          )} */}
      </div>
    </WhiteArea>
  );
};

export default Page;
