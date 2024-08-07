'use client';

import React from 'react';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { BadgeCard } from './badge-card';

export const BadgesSection = () => {
  return (
    <WhiteArea border twClass="">
      <h2 className="font-semibold text-slate-700">Badges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-start text-slate-700 sm:items-start mt-3">
        <BadgeCard
          href=""
          fill="#020617"
          title="Build for business hackathon."
          date="Achieved on Jan 30, 2024."
          badgeTheme="slateLight"
          badgeText="Participant"
        />
        <BadgeCard
          href=""
          fill="#15b512"
          title="Build for business hackathon."
          date="Achieved on Jan 30, 2024."
          badgeTheme="green"
          badgeText="Winner"
        />
        <BadgeCard
          href=""
          fill="#15b512"
          title="Build for business hackathon."
          date="Achieved on Jan 30, 2024."
          badgeTheme="green"
          badgeText="Winner"
        />
      </div>
    </WhiteArea>
  );
};
