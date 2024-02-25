'use client';

import React from 'react';
import {
  Activity,
  CheckCheckIcon,
  LibraryBig,
  MoreVertical,
  Octagon,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/dashboard/empty-state';
import { WhiteArea } from '@/components/dashboard/white-area';
import { IconButton } from '@/components/ui/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { MenuButton } from '@/components/dashboard/menu-button';

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
    completed: 'text-blue-600',
    pending: 'text-yellow-600',
    total: 'text-green-600',
  };
  const mapIdToBgColor: { [key: string]: string } = {
    completed: 'bg-blue-50/80',
    pending: 'bg-yellow-50/80',
    total: 'bg-green-50/80',
  };
  return (
    <button
      className={`${mapIdToBgColor[id]} flex flex-col justify-between border p-5 rounded-lg hover:bg-slate-50`}
    >
      <div className="flex items-center gap-2">
        <span className={mapIdToColor[id]}>
          <Icon size="24" />
        </span>
        <h2 className={mapIdToColor[id]}>{label}</h2>
      </div>
      <h3 className="ml-8 text-sm text-slate-800">{count} courses</h3>
    </button>
  );
};

const Page = (props: Props) => {
  return (
    <div className="inline-flex flex-col gap-5">
      <WhiteArea border>
        <section className="flex justify-between">
          <section>
            <section className="flex items-center gap-1 text-pink-500">
              <span>
                <Sparkles size={16} />
              </span>
              <h2>Quote of the day!</h2>
            </section>
            <section className="ml-5">
              <span className="text-sm text-slate-500">
                Make it work, make it right, make it fast. – Kent Beck
              </span>
            </section>
          </section>
          <section>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="text-slate-500 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent alignOffset={-20}>
                <MenuButton label="Close" Icon={X} />
                <MenuButton
                  label="Don't show again"
                  Icon={XCircle}
                  type="danger"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </section>
      </WhiteArea>
      <WhiteArea>
        <section className="flex flex-col gap-5">
          <section className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
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
          <EmptyState label="Your recent courses will appear here" />
        </section>
      </WhiteArea>
      <WhiteArea>
        <EmptyState label="Your activities will appear here" />
      </WhiteArea>
    </div>
  );
};

export default Page;
