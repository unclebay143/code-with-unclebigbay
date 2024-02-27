'use client';

import React, { useState } from 'react';
import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
import { materials, overviews } from '@/utils/dummy-data';
import { OverviewCard } from '@/components/dashboard/overview-card';
import { ActivityLogs } from '@/components/dashboard/activity-logs';
import { Courses } from '@/components/dashboard/courses';

type Props = {};

const Page = (props: Props) => {
  const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(true);
  const noRecentMaterials = materials.length === 0;
  const [courseFilter, setCourseFilter] = useState<
    'total' | 'pending' | 'completed'
  >('total');
  return (
    <section className="flex flex-col gap-3">
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
            <Courses />
          </section>
        )}
      </WhiteArea>
      <ActivityLogs />
    </section>
  );
};

export default Page;
