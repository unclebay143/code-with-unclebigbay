'use client';
import React, { ChangeEvent, useState } from 'react';
import { WhiteArea } from '../white-area';
import { DashboardSubheading } from '../dashboard-subheading';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';

const AnonymityForm = () => {
  const { data: user } = useCurrentStudent();
  const [isAnonymous, setIsAnonymous] = useState<boolean | undefined>(
    user?.isAnonymous,
  );
  const handleAnonymity = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;
    setIsAnonymous(status);
    console.log({ anonymity: status });
  };

  return (
    <WhiteArea border>
      <div className="flex justify-between items-center gap-5">
        <div>
          <DashboardSubheading title="Anonymity" />
          <p className="text-slate-500 text-sm">
            When activated, your identity will remain hidden on leaderboards,
            and you will be displayed as &apos;Anonymous&apos; across the site.
          </p>
        </div>

        <label htmlFor="one" className="check-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={isAnonymous}
            onChange={handleAnonymity}
          />
        </label>
      </div>
    </WhiteArea>
  );
};

export default AnonymityForm;
