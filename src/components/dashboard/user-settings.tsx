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
    <div className="lg:w-[80%] ">
      <WhiteArea border>
        <div className="flex flex-col gap-4">
          <WhiteArea border>
            <section className="flex flex-col gap-4 justify-stretch">
              <label htmlFor="photo">
                <DashboardSubheading title="Profile Picture" />
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
                  <input id="photo" type="file" className="hidden" />
                </label>
              </div>
            </section>
          </WhiteArea>

          <WhiteArea border>
            <div className="flex flex-col gap-3">
              <label htmlFor="name">
                <DashboardSubheading title="Name" />
              </label>
              <input
                type="text"
                name=""
                id="name"
                value={user?.name}
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
              />
              <p className="opacity-60 text-sm">
                This will be your display name on this app.
              </p>
            </div>
          </WhiteArea>
          <WhiteArea border>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">
                <DashboardSubheading title="Email" />
              </label>
              <input
                type="text"
                value={user?.email}
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                disabled
              />
              <p className="opacity-60 text-sm">
                This is sourced from your GitHub profile and will be used for
                sending you notifications.
              </p>
            </div>
          </WhiteArea>
          <WhiteArea border>
            <div className="flex flex-col gap-3">
              <label htmlFor="stack">
                <DashboardSubheading title="Stack" />
              </label>
              <select
                name="stack"
                id="stack"
                value="stack"
                className="p-2 border bg-slate-100 rounded-md outline-none"
              >
                <option>Frontend</option>
                <option>Backend</option>
              </select>
              <p className="opacity-60 text-sm"></p>
            </div>
          </WhiteArea>
          <WhiteArea border>
            <div className="flex flex-col gap-3">
              <label htmlFor="location">
                <DashboardSubheading title="Location" />
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
              <p className="opacity-60 text-sm">
                This will be use to recommend you to other students from your
                location.
              </p>
            </div>
          </WhiteArea>
          <WhiteArea border>
            <div className="flex flex-col gap-3">
              <DashboardSubheading title="Social Media" />
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
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="hashnode">
                  <DashboardSubheading title="Hashnode" />
                </label>
                <input
                  type="text"
                  name="hashnode"
                  className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                />
              </div>
              <p className="opacity-60 text-sm">
                These will serve as your social media display links for others
                to connect with you.
              </p>
            </div>
          </WhiteArea>
          <div className="flex p-2">
            <Button size="sm" appearance="secondary-slate">
              Update
            </Button>
          </div>
        </div>
      </WhiteArea>
    </div>
  );
};

export default UserSettings;
