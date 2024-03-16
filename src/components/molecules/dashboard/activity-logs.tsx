'use client';

import React from 'react';
import Link from 'next/link';
import { WhiteArea } from './white-area';
import { DashboardSubheading } from './dashboard-subheading';
import { Button } from '../../atoms/Button';
import useAudit from '@/components/hooks/useAudit';

export const ActivityLogs = ({
  defaultCount = 5,
}: {
  defaultCount?: number;
}) => {
  const { audits } = useAudit();
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-5">
        <DashboardSubheading title="Activity" />
        <div className="-my-6">
          {audits
            ?.slice(0, defaultCount)
            .map(({ _id, createdAt, title, description }) => {
              return (
                <div className="relative pl-8 sm:pl-32 py-6 group" key={_id}>
                  {/* {type && (
                    <div className="font-medium text-slate-600 mb-1 sm:mb-0">
                      {type}
                    </div>
                  )} */}
                  {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
                  <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-slate-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                    <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-slate-600 bg-slate-100 rounded-full">
                      {new Date(createdAt!).toLocaleString('USA', {
                        day: 'numeric',
                        month: 'short',
                        year: '2-digit',
                      })}
                    </time>
                    <Link href="" className="text-slate-600 hover:underline">
                      {title}
                    </Link>
                  </div>
                  {description && (
                    <div className="text-slate-500">{description} </div>
                  )}
                </div>
              );
            })}
          <div className="relative pl-8 sm:pl-32 py-6 group">
            <Button size="sm" appearance="secondary-slate">
              Show more
            </Button>
          </div>
        </div>
      </div>
    </WhiteArea>
  );
};
