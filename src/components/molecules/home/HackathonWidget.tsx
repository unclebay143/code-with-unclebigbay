'use client';

import React from 'react';
import { SectionWrapper } from '.';
import { Hackathon } from '@/utils/types';
import { formatStartAndEndDate, renderer } from '@/utils/date';
import { Button } from '@hashnode/matrix-ui';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { handleAuthentication } from '@/utils/auth';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';

type Props = { hackathon: Hackathon };

export const HackathonWidget = ({ hackathon }: Props) => {
  const { data: currentStudent } = useCurrentStudent();
  const studentId = currentStudent?._id;

  const { title, startDate, endDate, slug } = hackathon;

  const hackathonUrl = `/dashboard/hackathons/${slug}`;

  const hasHackathonEnded = dayjs(endDate).isBefore(dayjs());

  if (hasHackathonEnded) return null;

  return (
    // [background-image:url('https://www.perxels.com/assets/images/banner/bannerPattern2.png')] bg-top
    <section className="bg-slate-950 py-10">
      <SectionWrapper>
        <section className="flex flex-col lg:flex-row items-center justify-between gap-3 relative z-20">
          <Link
            href={hackathonUrl}
            className="group flex flex-col gap-2 text-center items-center lg:items-start"
          >
            <div>
              <div className="hidden sm:flex items-center gap-0.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-300" />
                </span>
                <span className="text-slate-300 text-xs">Hackathon</span>
              </div>

              <h3 className="group-hover:text-slate-300 text-slate-200 text-xl">
                {title}
              </h3>
            </div>
            <span className="text-blue-500 text-sm font-bold flex items-center gap-1">
              <Calendar size={14} /> {formatStartAndEndDate(startDate, endDate)}
              <span className="font-medium flex gap-1 group-hover:text-slate-300 text-slate-200">
                <span>(ends in</span>
                <span className="flex items-center [&>*]:group-hover:text-slate-300 [&>*]:text-slate-200 [&>*]:text-sm [&>*]:font-medium">
                  <Countdown date={new Date(endDate)} renderer={renderer} />)
                </span>
              </span>
            </span>
          </Link>

          <div className="dark">
            {studentId ? (
              <Button size="sm" appearance="primary-slate" asChild>
                <Link href={hackathonUrl}>View hackathon</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                appearance="primary-slate"
                onClick={() => handleAuthentication({ nextUrl: hackathonUrl })}
              >
                View hackathon
              </Button>
            )}
          </div>
        </section>
      </SectionWrapper>
    </section>
  );
};
