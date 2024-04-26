'use client';

import React, { useState } from 'react';
import { SectionWrapper } from '.';
import { Hackathon } from '@/utils/types';
import { formatDate } from '@/utils/date';
import { Button } from '@hashnode/matrix-ui';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { useHackathonById } from '@/components/hooks/useHackathon';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { handleAuthentication } from '@/utils/auth';
import dayjs from 'dayjs';

type Props = { hackathon: Hackathon; isRegistered: boolean };

export const HackathonWidget = ({ hackathon, isRegistered }: Props) => {
  const [registered, setRegistered] = useState(isRegistered);
  const { data: currentStudent } = useCurrentStudent();

  const { _id: hackathonId, title, startDate, endDate, slug } = hackathon;
  const { joinHackathon, isJoinHackathonPending } =
    useHackathonById(hackathonId);

  const disableJoinBtn = registered || isJoinHackathonPending;

  const hackathonUrl = `/dashboard/hackathons/${slug}`;

  const hasHackathonEnded = dayjs(endDate).isBefore(dayjs());

  if (hasHackathonEnded) return null;

  return (
    <section className="bg-slate-950 py-10">
      <SectionWrapper>
        <section className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20">
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <div>
              <span className="relative hidden sm:flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-300" />
              </span>
              <h3 className="text-slate-200 text-xl">{title}</h3>
            </div>
            <span className="text-blue-500 text-sm font-bold flex items-center gap-1">
              <Calendar size={14} /> {formatDate(startDate, endDate)}
            </span>
          </div>

          <div className="dark">
            {registered ? (
              <Button size="sm" appearance="primary-slate" asChild>
                <Link href={hackathonUrl} className="font-normal text-xs">
                  Submit entry
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                appearance="primary-slate"
                disabled={disableJoinBtn}
                onClick={() => {
                  if (currentStudent?._id) {
                    joinHackathon({
                      hackathonId,
                      studentId: currentStudent._id,
                    }).then(() => {
                      setRegistered(true);
                      console.log('run');
                    });
                  } else {
                    handleAuthentication({ nextUrl: hackathonUrl });
                  }
                }}
              >
                <span className="font-normal text-xs">Join hackathon</span>
              </Button>
            )}
          </div>
        </section>
      </SectionWrapper>
    </section>
  );
};
