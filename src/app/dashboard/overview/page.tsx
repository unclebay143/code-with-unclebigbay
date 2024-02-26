'use client';

import React, { useState } from 'react';
import {
  Activity,
  CheckCheckIcon,
  CheckCircle2,
  Circle,
  LibraryBig,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/dashboard/white-area';
import { CourseCard } from '@/components/dashboard/course-card';
import { Materials } from '../../../../types/course';
import { QuoteOfTheDay } from '@/components/dashboard/quote-of-the-day';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '@/components/ui/Select';
import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type Props = {};

type Overview = {
  id: string;
  label: string;
  Icon: LucideIcon;
  count: number;
  active?: boolean;
  setCurrentCourse?: Function;
};

const overviews: Overview[] = [
  { id: 'total', label: 'Total', Icon: LibraryBig, count: 2 },
  {
    id: 'pending',
    label: 'Pending',
    Icon: Activity,
    count: 3,
  },
  {
    id: 'completed',
    label: 'Completed',
    Icon: CheckCheckIcon,
    count: 100,
  },
];

const OverviewCard = ({
  id,
  label,
  count,
  Icon,
  active,
  setCurrentCourse,
}: Overview) => {
  const mapIdToColor: { [key: string]: string } = {
    completed: 'text-blue-600',
    pending: 'text-yellow-600',
    total: 'text-green-600',
  };
  const mapIdToBgColor: { [key: string]: string } = {
    completed: 'bg-blue-50',
    pending: 'bg-yellow-50',
    total: 'bg-green-50',
  };
  return (
    <button
      className={`${mapIdToBgColor[id]} flex flex-col justify-between border p-5 rounded-lg`}
      onClick={() => setCurrentCourse && setCurrentCourse(id)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-2">
            <span className={mapIdToColor[id]}>
              <Icon size="24" />
            </span>
            <h2 className={mapIdToColor[id]}>{label}</h2>
          </div>
          <h3 className="ml-8 text-sm text-slate-600">{count} courses</h3>
        </div>
        <span className="text-slate-400">
          {active ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </span>
      </div>
    </button>
  );
};

const recentMaterials: Materials = [
  {
    title: 'Introduction to HTML',
    description:
      "This is introduction to HTML, you'll learn about the basics of html and the html tags and attributes.",
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU&t=436s',
    type: 'video',
    coverImageURL:
      'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/11/what-is-html-3.webp',
  },
  {
    title: 'Introduction to CSS',
    description:
      "This is introduction to HTML, you'll learn about the basics of html and the html tags and attributes.",
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU&t=436s',
    type: 'video',
    coverImageURL:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708982962345/f8a881dd-bfcf-4fae-8bf4-8d85219f9ed8.png',
  },
  {
    title: 'Introduction to JavaScript',
    description:
      "This is introduction to HTML, you'll learn about the basics of html and the html tags and attributes.",
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU&t=436s',
    type: 'video',
    coverImageURL:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
  },
];

interface Activity {
  type?: string;
  date: number;
  title: string;
  description?: string;
}

const activities: Activity[] = [
  { date: Date.now(), title: 'Created an account' },
  { type: 'Course', date: Date.now(), title: 'Started "Introduction to HTML"' },
  { date: Date.now(), title: 'Logged in' },
  {
    type: 'Course',
    date: Date.now(),
    title: 'Completed "Introduction to HTML"',
  },
  { type: 'Course', date: Date.now(), title: 'Deleted "Introduction to HTML"' },
  {
    type: 'Course',
    date: Date.now(),
    title: 'Abandoned "Introduction to HTML"',
  },
  { date: Date.now(), title: 'Updated profile' },
];

const Page = (props: Props) => {
  const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(true);
  const noRecentMaterials = recentMaterials.length === 0;
  const [courseFilter, setCourseFilter] = useState<
    'total' | 'pending' | 'completed'
  >('total');
  return (
    <div className="inline-flex flex-col gap-5">
      <section className="flex flex-col gap-5">
        {showQuoteWidget && (
          <QuoteOfTheDay close={() => setShowQuoteWidget(false)} />
        )}
        <WhiteArea twColor="bg-slate-50" border>
          <section className="flex flex-col gap-3">
            <DashboardSubheading title="Your course overview" />
            <section className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {overviews.map(({ id, Icon, count, label }) => (
                <OverviewCard
                  key={id}
                  id={id}
                  Icon={Icon}
                  count={count}
                  label={label}
                  active={courseFilter === id}
                  setCurrentCourse={setCourseFilter}
                />
              ))}
            </section>
          </section>
        </WhiteArea>
        <WhiteArea border>
          {noRecentMaterials ? (
            <EmptyState label="Your recent learning material will appear here" />
          ) : (
            <section className="flex flex-col gap-3">
              <DashboardSubheading title="Recent learning materials" />
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                  <input
                    className="border rounded-xl text-slate-600 w-full py-3 pl-4 pr-2"
                    placeholder="Find learning material"
                  />
                </div>
                <div className="sm:w-[200px]">
                  <Select onValueChange={(e) => console.log(e)}>
                    <SelectTrigger size="md" placeholder="Select a course..." />
                    <SelectContent>
                      <SelectViewPort>
                        <SelectItem value={'value-1'} label="HTML" />
                      </SelectViewPort>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <section className="max-w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
                {recentMaterials.map((material) => {
                  return (
                    <CourseCard key={material.title} material={material} />
                  );
                })}
              </section>
            </section>
          )}
        </WhiteArea>
      </section>
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          <DashboardSubheading title="Activity Log" />
          <div className="-my-6">
            {activities.map(({ type, date, title, description }, index) => {
              return (
                <div className="relative pl-8 sm:pl-32 py-6 group" key={index}>
                  {type && (
                    <div className="font-medium text-slate-600 mb-1 sm:mb-0">
                      {type}
                    </div>
                  )}
                  {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
                  <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-slate-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                    <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-slate-600 bg-slate-100 rounded-full">
                      {new Date(date).toLocaleString('USA', {
                        day: 'numeric',
                        month: 'short',
                        year: '2-digit',
                      })}
                    </time>
                    <Link href="" className="text-slate-600 hover:underline">
                      {title}
                    </Link>
                  </div>
                  {description && (
                    <div className="text-slate-500">{description} </div>
                  )}
                </div>
              );
            })}
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <Button size="sm" appearance="secondary-slate">
                Show more
              </Button>
            </div>
          </div>
        </div>
      </WhiteArea>
    </div>
  );
};

export default Page;
