'use client';

import React from 'react';
import Link from 'next/link';
import { WhiteArea } from './white-area';
import { DashboardSubheading } from './dashboard-subheading';
import { Audits } from '@/utils/types';
import { Button } from '@hashnode/matrix-ui';
import { formatDate } from '@/utils/date';

const renderTitle = (title: string) => (
  <h3 className="text-slate-600 ">{title}</h3>
);

const AuditTimeLine = ({
  time,
  title,
  description,
  url,
}: {
  url?: string;
  time: string;
  title: string;
  description?: string;
}) => {
  const timeStamp = formatDate(time);
  return (
    <div
      className="relative pl-8 sm:pl-32 py-6 group"
      title={timeStamp.toString()}
    >
      {/* {type && (
                    <div className="font-medium text-slate-600 mb-1 sm:mb-0">
                      {type}
                    </div>
                  )} */}
      {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
      <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-slate-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold w-[87px] whitespace-nowrap h-6 mb-3 sm:mb-0 text-slate-600 bg-slate-100 rounded-full">
          {timeStamp}
        </time>
        {url ? (
          <Link href={url} className="hover:underline">
            {renderTitle(title)}
          </Link>
        ) : (
          renderTitle(title)
        )}
      </div>
      {description && <div className="text-slate-500">{description} </div>}
    </div>
  );
};

// const AuditTimeLineLoader = ({ count = 2 }: { count?: number }) => {
//   return (
//     <>
//       {Array(count)
//         .fill({})
//         .map((_, index) => {
//           return (
//             <div
//               className="relative pl-8 sm:pl-32 py-6 group"
//               key={`AuditTimeLineLoader-${index}`}
//             >
//               <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-slate-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
//                 <time className="sm:absolute left-0 translate-y-0.5 w-20 h-6 mb-3 sm:mb-0 bg-slate-100 rounded-full" />
//                 <time className="w-28 h-6 mb-3 sm:mb-0 bg-slate-100 rounded-full" />
//               </div>
//               <div className="w-24 h-5 mb-3 sm:mb-0 bg-slate-100 rounded-full" />
//             </div>
//           );
//         })}
//     </>
//   );
// };

export const ActivityLogs = ({
  audits,
  defaultCount,
  hideShowMore,
}: {
  audits: Audits;
  defaultCount?: number;
  loaderCount?: number;
  hideShowMore?: boolean;
}) => {
  return (
    <WhiteArea border>
      <div className="flex flex-col gap-5">
        <DashboardSubheading title="Activity" />

        <div className="-my-6">
          {audits
            ?.slice(0, defaultCount)
            .map(({ _id, createdAt, title, description, url }) => {
              return (
                <AuditTimeLine
                  key={_id}
                  time={createdAt}
                  title={title}
                  description={description}
                  url={url}
                />
              );
            })}
          {!hideShowMore && (
            <div className="relative pl-8 sm:pl-32 py-6 flex items-start">
              <Button size="sm" appearance="secondary-slate" asChild>
                <Link href="/dashboard/activity">Show more</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </WhiteArea>
  );
};
