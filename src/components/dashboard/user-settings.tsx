'use client';
import { Button } from '@/components/ui/Button';
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { WhiteArea } from './white-area';
import { DashboardSubheading } from './dashboard-subheading';

type Props = {
  name: string;
  email: string;
  image: string;
};

const UserSettings = () => {
  const { data: session } = useSession();
  const user = session?.user as Props;
  return (
    <div className="lg:w-[80%] px-3">
      <div className="flex flex-col gap-4">
        <WhiteArea border>
          <section className="flex flex-col gap-4 justify-stretch">
            <label htmlFor="photo" className="border-b pb-3">
              <DashboardSubheading title="Profile Picture" />
              <p className="text-slate-500 text-sm">Sourced from GitHub</p>
            </label>
            <div className="flex flex-col items-start">
              <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100"
              >
                <Image
                  src={user?.image}
                  alt={user?.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <input disabled id="photo" type="file" className="hidden" />
              </label>
            </div>
          </section>
        </WhiteArea>

        <WhiteArea border>
          <div className="flex flex-col gap-5">
            <div className="border-b pb-3">
              <DashboardSubheading title="Personal Details" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="name">
                <DashboardSubheading title="Name" />
                <p className="text-slate-500 text-sm">
                  This will be your display name on this site.
                </p>
              </label>
              <input
                type="text"
                name=""
                id="name"
                value={user?.name}
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">
                <DashboardSubheading title="Email" />
                <p className="text-slate-500 text-sm">
                  This is sourced from your GitHub profile and will be used for
                  sending you notifications.
                </p>
              </label>
              <input
                type="text"
                value={user?.email}
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="bio">
                <DashboardSubheading title="Bio" />
              </label>
              <textarea
                className="min-h-[200px] text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                placeholder="Introduce yourself to the world."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">
                <DashboardSubheading title="Location" />
                <p className="text-slate-500 text-sm">
                  This will be use to recommend you to other students from your
                  location.
                </p>
              </label>
              <select
                name="country"
                id="location"
                className="p-2 border bg-slate-100 rounded-md outline-none"
              >
                {/* free country endpoint will be map through to display all the countries */}
                <option>Argentina</option>
                <option>Brazil</option>
                <option>Nigeria</option>
              </select>
            </div>
            <div className="flex">
              <Button size="sm">Update</Button>
            </div>
          </div>
        </WhiteArea>
        <WhiteArea border>
          <div className="flex flex-col gap-5">
            <div className="border-b pb-3">
              <DashboardSubheading title="Professional Details" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="stack">
                <DashboardSubheading title="Stack" />
              </label>
              <select
                name="stack"
                id="stack"
                className="p-2 border bg-slate-100 rounded-md outline-none"
              >
                <option>Frontend</option>
                <option>Backend</option>
              </select>
            </div>

            <div className="flex">
              <Button size="sm">Update</Button>
            </div>
          </div>
        </WhiteArea>
        <WhiteArea border>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="border-b pb-3">
                <DashboardSubheading title="Social Media" />
                <p className="text-slate-500 text-sm">
                  These will serve as your social media display links for others
                  to connect with you.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="github">
                  <DashboardSubheading title="GitHub" />
                </label>
                <input
                  type="text"
                  name="github"
                  placeholder="https://github.com/username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="linkedIn">
                  <DashboardSubheading title="LinkedIn" />
                </label>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="https://linkedin.com/in/username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="twitter">
                  <DashboardSubheading title="X/Twitter" />
                </label>
                <input
                  type="text"
                  name="twitter"
                  placeholder="https://x.com/@username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="facebook">
                  <DashboardSubheading title="Facebook" />
                </label>
                <input
                  type="text"
                  name="facebook"
                  placeholder="https://facebook.com/username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="instagram">
                  <DashboardSubheading title="Instagram" />
                </label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="https://instagram.com/username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="stackoverflow">
                  <DashboardSubheading title="Stackoverflow" />
                </label>
                <input
                  type="text"
                  name="stackoverflow"
                  placeholder="https://stackoverflow.com/users/7953084/username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="youtube">
                  <DashboardSubheading title="Youtube" />
                </label>
                <input
                  type="text"
                  name="youtube"
                  placeholder="https://youtube.com/@username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mastodon">
                  <DashboardSubheading title="Mastodon" />
                </label>
                <input
                  type="text"
                  name="mastodon"
                  placeholder="https://mastodon.com/@username"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex">
                <Button size="sm">Update</Button>
              </div>
            </div>
          </div>
        </WhiteArea>
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
              <input id="one" type="checkbox" />
            </label>
          </div>
        </WhiteArea>
      </div>
    </div>
  );
};

export default UserSettings;
