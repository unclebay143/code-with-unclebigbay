'use client';

import React, { useState } from 'react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/molecules/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { OverviewCard } from '@/components/molecules/dashboard/overview-card';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { Courses } from '@/components/molecules/dashboard/courses';
import useMaterial from '@/components/hooks/useMaterial';
import { overviews } from '@/utils';

const Page = () => {
  const { materials } = useMaterial();
  const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(true);
  const noRecentMaterials = materials && materials.length === 0;
  const [courseFilter, setCourseFilter] = useState<
    'total' | 'pending' | 'completed'
  >('total');

  return (
    <section className="flex flex-col gap-3">
      {showQuoteWidget && (
        <QuoteOfTheDay close={() => setShowQuoteWidget(false)} />
      )}
      <WhiteArea twClass="bg-indigo-50/60 border-indigo-50" border>
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
      {/* <section className="flex gap-1">
        <button className="rounded-full py-1 px-3 text-slate-600 bg-slate-100 text-sm font-medium">
          Recent
        </button>
        <button className="rounded-full py-1 px-3 text-slate-600 bg-slate-100 text-sm font-medium">
          Personalized
        </button>
      </section> */}
      <WhiteArea border>
        {noRecentMaterials ? (
          <EmptyState label="Your recent learning material will appear here" />
        ) : (
          <section className="flex flex-col gap-3">
            <DashboardSubheading title="Recent learning materials" />
            <Courses size={10} hideSearchOptions />
          </section>
        )}
      </WhiteArea>

      <ActivityLogs />
    </section>
  );
};

export default Page;
