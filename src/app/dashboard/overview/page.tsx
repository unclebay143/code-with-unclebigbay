'use client';

import React, { useState } from 'react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/molecules/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { materials, overviews } from '@/utils/dummy-data';
import { OverviewCard } from '@/components/molecules/dashboard/overview-card';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { Courses } from '@/components/molecules/dashboard/courses';

const Page = () => {
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
      <WhiteArea twClass="bg-slate-50" border>
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
            <Courses size={10} showLoadMoreButton />
          </section>
        )}
      </WhiteArea>
      <ActivityLogs />
    </section>
  );
};

export default Page;
