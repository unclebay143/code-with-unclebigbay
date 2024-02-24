'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BarChart, LibraryBig } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

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
    <aside>
      <nav>
        <div className="transition-all w-0 lg:w-[270px]" />
        <div
          className={`flex flex-col gap-1 px-2 py-4 z-10 fixed left-0 top-[75px] bottom-0 bg-white dark:bg-slate-950 w-[270px] transition-transform ease-in-out -translate-x-full lg:translate-x-0 border-r dark:border-slate-800/80 ${sidebarOpen && 'translate-x-0'}`}
        >
          {sidebarLinks.map(({ key, label, Icon, slug }) => {
            return (
              <SidebarLink
                key={`sidebar-link-${key}`}
                label={label}
                Icon={Icon}
                slug={slug}
                isActive={currentPageName === label.toLowerCase()}
              />
            );
          })}
          <button onClick={() => signOut()}>Logout </button>
        </div>
      </nav>
    </aside>
  );
};
