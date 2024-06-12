'use client';

import { YTVideo } from '@/components/atoms/YTVideo';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { ONBOARDING_YT_VIDEO_ID } from '@/utils';
import { ArrowExternalLink02 } from '@hashnode/matrix-ui';
import { Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-3 text-center py-5">
        <DashboardSubheading title="Help centers" />
        <section className="flex flex-col gap-7">
          <section className="max-w-2xl mx-auto flex flex-col gap-3">
            <h3 className="text-center text-2xl font-medium text-slate-600">
              Need Help? Join Our Community Platform!
            </h3>
            <p className="text-slate-600">
              If you&apos;re feeling stuck or have questions about your course
              course, don&apos;t worry! We have a vibrant community platform
              where you can connect with fellow students and get help from
              instructors.
            </p>
          </section>
          <section className="grid md:grid-cols-3 gap-3">
            <WhiteArea
              twClass="group relative text-white bg-[#282828] bg-opacity-95 hover:bg-opacity-100"
              border
            >
              <div className="absolute right-3 invisible text-slate-50 group-hover:visible">
                <ArrowExternalLink02 size="sm" />
              </div>
              <Link
                rel="noopener"
                target="_blank"
                href="https://www.youtube.com/@unclebigbay"
                className="flex items-center justify-center p-10"
              >
                <Youtube size={32} />
              </Link>
            </WhiteArea>
            <WhiteArea
              twClass="group relative text-white bg-[#128c7e] bg-opacity-95 hover:bg-opacity-100"
              border
            >
              <div className="absolute right-3 invisible text-slate-50 group-hover:visible">
                <ArrowExternalLink02 size="sm" />
              </div>
              <Link
                target="_blank"
                rel="noopener"
                href="https://chat.whatsapp.com/INypkcQok4B8bzlI0rQ2oz"
                className="flex items-center justify-center p-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-8 w-8 fill-current"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </Link>
            </WhiteArea>
            <WhiteArea
              twClass="group relative text-white bg-[#7289DA] bg-opacity-95 hover:bg-opacity-100"
              border
            >
              <div className="absolute right-3 invisible text-slate-50 group-hover:visible">
                <ArrowExternalLink02 size="sm" />
              </div>
              <Link
                target="_blank"
                rel="noopener"
                href="https://discord.gg/UqEYh7hqtD"
                className="flex items-center justify-center p-10"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                    <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                    <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
                    <path d="M7 16.5c3.5 1 6.5 1 10 0" />
                  </svg>
                </span>
              </Link>
            </WhiteArea>
          </section>
          <p className="text-slate-600 text-sm">
            Joining our community is a great way to collaborate, share insights,
            and overcome challenges together.
          </p>
        </section>
      </div>
      <section className="flex flex-col gap-5 mt-10">
        <h3 className="text-center text-2xl font-medium text-slate-600">
          How to use platform?
        </h3>
        <YTVideo ytVideoId={ONBOARDING_YT_VIDEO_ID} />
      </section>
    </WhiteArea>
  );
};

export default Page;
