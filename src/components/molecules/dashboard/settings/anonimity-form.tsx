'use client';

import React, { ChangeEvent, useState } from 'react';
import { WhiteArea } from '../white-area';
import { DashboardSubheading } from '../dashboard-subheading';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { Student } from '@/utils/types';

const AnonymityForm = ({ currentStudent }: { currentStudent: Student }) => {
  const { update } = useCurrentStudent();

  const [isAnonymous, setIsAnonymous] = useState<boolean>(
    currentStudent?.isAnonymous,
  );
  const handleAnonymity = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;

    try {
      update.mutate({
        username: currentStudent?.username,
        _id: currentStudent?._id,
        isAnonymous: status,
      });
      setIsAnonymous(status);
      // toast.success('Anonymity status updated.');
    } catch (err) {
      console.log(err);
    }
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
