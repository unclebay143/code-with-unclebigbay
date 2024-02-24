'use client';

import React from 'react';
import { Activity, CheckCheckIcon, LibraryBig } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Props = {};

type Overview = { id: string; label: string; Icon: LucideIcon; count: number };

const overviews: Overview[] = [
  { id: 'total', label: 'Total', Icon: LibraryBig, count: 2 },
  {
    id: 'pending',
    label: 'Pending',
    Icon: Activity,
    count: 3,
  },
  {
    id: 'completed',
    label: 'Completed',
    Icon: CheckCheckIcon,
    count: 100,
  },
];

const OverviewCard = ({ id, label, count, Icon }: Overview) => {
  const mapIdToColor: { [key: string]: string } = {
    completed: 'text-blue-500',
    pending: 'text-yellow-500',
    total: 'text-green-500',
  };
  return (
    <button className="flex flex-col justify-between border p-5 rounded-lg hover:bg-slate-50">
      <div className="flex items-center gap-2">
        <span className={mapIdToColor[id]}>
          <Icon size="24" />
        </span>
        <h2 className={'text-slate-700'}>{label}</h2>
      </div>
      <h3 className="ml-8 text-sm text-slate-800">{count} courses</h3>
    </button>
  );
};

const Page = (props: Props) => {
  return (
    <div>
      <section className="grid mx-auto sm:grid-cols-2 md:grid-cols-3 gap-5">
        {overviews.map(({ id, Icon, count, label }) => (
          <OverviewCard
            key={id}
            id={id}
            Icon={Icon}
            count={count}
            label={label}
          />
        ))}
      </section>
    </div>
  );
};

export default Page;
