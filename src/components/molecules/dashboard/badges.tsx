'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { BadgeIcon } from '@/components/icons/Badge';
import { Badge } from '@hashnode/matrix-ui';

export const Badges = () => {
  return (
    <WhiteArea border twClass="">
      <h2 className="font-semibold text-slate-700">Badges</h2>
      <div className="grid sm:grid-cols-2 gap-4 justify-start text-slate-700 sm:items-start mt-3">
        <Link href="">
          <div className=" flex flex-col sm:flex-row items-center sm:gap-4 border-slate-200 border p-2 rounded-md hover:bg-slate-100 cursor-pointer">
            <div className="rounded-full w-20 h-20 relative overflow-hidden">
              <BadgeIcon fill="#020617" />
            </div>
            <div className=" flex flex-col sm:gap-4  items-center sm:items-start text-center">
              <h3 className="text-md font-medium">
                Build for business hackathon.
              </h3>
              <div className="flex flex-col sm:flex-row sm:gap-6 items-center ">
                <p className="text-sm text-slate-400">
                  Achieved on Jan 30, 2024.
                </p>
                <Badge theme="slateLight">Participant</Badge>
              </div>
            </div>
          </div>
        </Link>
        <Link href="">
          <div className=" flex flex-col sm:flex-row items-center sm:gap-4 border-slate-200 border p-2 rounded-md hover:bg-slate-100 cursor-pointer">
            <div className="rounded-full text-green-600 w-20 h-20 relative overflow-hidden">
              <BadgeIcon fill="#15b512" />
            </div>
            <div className=" flex flex-col sm:gap-4  items-center sm:items-start text-center">
              <h3 className="text-md font-medium">
                Build for business hackathon.
              </h3>
              <div className="flex flex-col sm:flex-row sm:gap-6 items-center ">
                <p className="text-sm text-slate-400">
                  Achieved on Jan 30, 2024.
                </p>
                <Badge theme="green">Winner</Badge>
              </div>
            </div>
          </div>
        </Link>
        <Link href="">
          <div className=" flex flex-col sm:flex-row items-center sm:gap-4 border-slate-200 border p-2 rounded-md hover:bg-slate-100 cursor-pointer">
            <div className="rounded-full w-20 h-20 relative overflow-hidden">
              <BadgeIcon fill="#15b512" />
            </div>
            <div className=" flex flex-col sm:gap-4  items-center sm:items-start text-center">
              <h3 className="text-md font-medium">
                Build for business hackathon.
              </h3>
              <div className="flex flex-col sm:flex-row sm:gap-6 items-center ">
                <p className="text-sm text-slate-400">
                  Achieved on Jan 30, 2024.
                </p>
                <Badge theme="green">Winner</Badge>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </WhiteArea>
  );
};
