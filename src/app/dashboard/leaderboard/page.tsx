'use client';

import { DashboardSubheading } from '@/components/dashboard/dashboard-subheading';
import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/dashboard/white-area';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-3">
        <DashboardSubheading title="Leaderboard" />
        <EmptyState label="Top 10 students will appear here" />
      </div>
    </WhiteArea>
  );
};

export default Page;
