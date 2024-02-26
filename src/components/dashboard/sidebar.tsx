import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ActivityIcon, BarChart, LibraryBig, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {};

type SidebarLink = {
  key: string;
  label: string;
  slug: string;
  Icon: LucideIcon;
  isActive?: boolean;
};

type SidebarLinks = SidebarLink[];

const sidebarLinks: SidebarLinks = [
  { key: 'overview', label: 'overview', slug: 'overview', Icon: BarChart },
  { key: 'courses', label: 'courses', slug: 'courses', Icon: LibraryBig },
  {
    key: 'leaderboard',
    label: 'leaderboard',
    slug: 'leaderboard',
    Icon: Trophy,
  },
  {
    key: 'activity',
    label: 'Activity Log',
    slug: 'activity',
    Icon: ActivityIcon,
  },
];

const SidebarLink = ({ label, Icon, isActive, slug }: SidebarLink) => {
  return (
    <Link
      href={`/dashboard/${slug}`}
      className={`p-3 capitalize rounded-md flex items-center gap-1.5 text-sm text-slate-600 hover:bg-slate-100 w-full ${isActive && 'bg-slate-100 text-slate-950 font-medium'}`}
    >
      <span>
        <Icon size="18" />
      </span>
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2];

  return (
    <aside className="hidden lg:flex">
      <nav>
        <div className="transition-all w-0 lg:w-[270px]" />
        <div
          className={`border rounded-lg flex flex-col gap-1 px-2 fixed py-4 z-10 bg-white dark:bg-slate-950 w-[270px] transition-transform ease-in-out -translate-x-full lg:translate-x-0 ${sidebarOpen && 'translate-x-0'}`}
        >
          {sidebarLinks.map(({ key, label, Icon, slug }) => {
            return (
              <SidebarLink
                key={`sidebar-link-${key}`}
                label={label}
                Icon={Icon}
                slug={slug}
                isActive={currentPageName === key.toLowerCase()}
              />
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
