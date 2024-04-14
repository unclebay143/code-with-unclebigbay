'use client';
import dayjs from 'dayjs';
import { Button } from '@/components/atoms/Button';
import {
  useHackathons,
  useHackathonById,
} from '@/components/hooks/useHackathon';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Hackathon } from '@/utils/types';
import * as Tabs from '@radix-ui/react-tabs';
import { Calendar, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import Countdown from 'react-countdown';
import { useState } from 'react';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

/* 
Badges name ideas
- First online hackathon
- Hackathon Winner
- Hackathon Participant

*/

const HackathonCard = ({ hackathon }: { hackathon: Hackathon }) => {
  const {
    _id,
    coverImage,
    brief,
    title,
    tags,
    startDate,
    endDate,
    participantCount,
    slug,
  } = hackathon;
  const { isRegistered } = useHackathonById(_id);
  const [hackathonHasEnded, setHackathonHasEnded] = useState(false);

  // @ts-ignore
  const renderer = ({ days, hours, minutes, seconds }) => {
    const parts = [];

    // Handle negative values (optional)
    if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
      throw new Error('Time components cannot be negative.');
    }

    // Add non-zero units with proper pluralization
    if (days) {
      parts.push(`${days} ${days > 1 ? 'days' : 'day'}`);
    } else if (hours) {
      parts.push(`${hours} ${hours > 1 ? 'hours' : 'hour'}`);
    } else if (minutes) {
      parts.push(`${minutes} ${minutes > 1 ? 'mins' : 'min'}`);
    } else if (seconds) {
      parts.push(`${seconds} ${seconds > 1 ? 'secs' : 'sec'}`);
    } else {
      parts.push('Ended');
      setHackathonHasEnded(true);
    }

    return (
      <div className="font-bold text-xl text-slate-600">{parts.join(' ')}</div>
    );
  };

  function formatDate(startDate: string, endDate: string) {
    const startDay = dayjs(startDate);
    const endDay = dayjs(endDate);

    // Use `July 1 - 31` format for same month and `July 15 - Aug 15` for multi month
    if (startDay.month() === endDay.month()) {
      // Use format string to show only date and month for both
      return `${startDay.format('MMMM Do')} - ${endDay.format('Do')}`;
    } else {
      // Use format string to show full date for both
      return `${startDay.format('MMMM Do')} - ${endDay.format('MMMM Do')}`;
    }
  }

  return (
    <section
      className="hover:bg-slate-50 flex flex-col sm:flex-row pb-5 sm:pb-0 border rounded-lg overflow-hidden"
      key={`hackathon-card-${title}`}
    >
      <section className="grow flex flex-col sm:flex-row gap-1">
        <Link
          href="hackathons/slug"
          className="relative min-h-[150px] sm:min-h-[100px] sm:w-[300px] md:w-[270px] xl:w-[190px] h-full border-r overflow-hidden"
        >
          <Image src={coverImage} alt="" fill className="object-cover" />
        </Link>
        <section className="p-5 flex flex-col justify-between gap-2">
          <section className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1 items-start">
              <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                {participantCount > 5 ? (
                  <>
                    <span className="text-sm text-slate-600 flex items-center gap-1">
                      <Users size={14} />
                      Participants: {participantCount}
                    </span>
                    <span className="mx-1 hidden lg:inline">&middot;</span>
                  </>
                ) : null}
                <span className="text-blue-500 text-sm font-medium flex items-center gap-1">
                  <Calendar size={14} /> {formatDate(startDate, endDate)}
                </span>
              </div>
              <Link
                href="hackathons/slug"
                className="font-semibold text-slate-700 hover:text-slate-600"
              >
                {title}
              </Link>
            </div>

            <p className="text-sm font-medium text-slate-500 w-full max-w-[565px]">
              {brief}
            </p>
          </section>
          <div className="flex flex-col min-[340px]:flex-row gap-2 sm:items-center max-w-[250px]">
            <Button size="xs" disabled={isRegistered} width="full">
              {isRegistered ? 'Joined!' : 'Join hackathon'}
            </Button>
            <Button size="xs" appearance="secondary-slate" width="full" asChild>
              <Link href={`hackathons/${slug}`}>View details</Link>
            </Button>
          </div>
          {tags?.map((tag, index) => (
            <section key={index}>
              <span className="px-2 py-0.5 capitalize rounded-full bg-indigo-100/20 text-slate-600 text-xs border">
                {tag}
              </span>
            </section>
          ))}
        </section>
      </section>
      <section className="px-5 hidden md:flex flex-col justify-center items-center text-center border-l whitespace-nowrap min-w-[112px]">
        {hackathonHasEnded ? (
          <h3 className="text-sm text-red-600">Ended</h3>
        ) : (
          <div className="flex items-center flex-col gap-2 text-slate-600">
            <Clock size={20} />
            <Countdown date={new Date(endDate)} renderer={renderer} />
          </div>
        )}
      </section>
    </section>
  );
};

const Page = () => {
  const { hackathons, isLoading } = useHackathons();
  const showHackathons = !isLoading && hackathons && hackathons.length;

  return (
    <WhiteArea border>
      <section className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <DashboardSubheading title="Hackathons" />
          <div className="text-sm text-slate-600">
            Find and participate in hackathons to improve your skills and win
            prizes.
          </div>
        </div>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <Tabs.List
            className="flex gap-3 border-b"
            aria-label="Manage your account"
          >
            <Tabs.Trigger value="tab2">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                Active
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                Ended
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger className="border-b border-slate-400" value="tab1">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                All
              </button>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
            {showHackathons && (
              <section className="flex flex-col gap-3 mt-8">
                {hackathons.map((hackathon) => {
                  return (
                    <HackathonCard key={hackathon._id} hackathon={hackathon} />
                  );
                })}
              </section>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </WhiteArea>
  );
};

export default Page;
