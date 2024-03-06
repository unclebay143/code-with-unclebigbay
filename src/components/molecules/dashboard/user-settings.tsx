'use client';
import React from 'react';
import { WhiteArea } from './white-area';
import { DashboardSubheading } from './dashboard-subheading';
import UserPersonalSettings from './user-personal-settings';
import UserProfessionalSettings from './user-pro-settings';
import UserSocialSettings from './user-social-settings';

const UserSettings = () => {
  return (
    <div className="lg:w-[80%] px-3">
      <div className="flex flex-col gap-4">
        <UserPersonalSettings />
        <UserProfessionalSettings />
        <UserSocialSettings />
        <WhiteArea border>
          <div className="flex justify-between items-center gap-5">
            <div>
              <DashboardSubheading title="Anonymity" />
              <p className="text-slate-500 text-sm">
                When activated, your identity will remain hidden on
                leaderboards, and you will be displayed as &apos;Anonymous&apos;
                across the site.
              </p>
            </div>

            <label htmlFor="one" className="check-label">
              <input id="one" type="checkbox" className="custom-checkbox" />
            </label>
          </div>
        </WhiteArea>
      </div>
    </div>
  );
};

export default UserSettings;
