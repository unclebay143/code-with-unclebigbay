import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ActivityIcon,
  BarChart,
  HelpCircle,
  LibraryBig,
  Settings,
  Trophy,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlideOver, SlideOverHeader } from '../ui/SlideOver';
import { CodeWithUnclebigbayLogo } from '../ui/CodeWithUnclebigbayLogo';
import { IconButton } from '../ui/IconButton';
import { XMark } from '../icons/XMark';

type Props = {};

type SidebarLink = {
  key: string;
  label: string;
  slug: string;
  Icon: LucideIcon;
  isActive?: boolean;
  shadowHide?: boolean;
  onClick?: () => void;
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
  {
    key: 'settings',
    label: 'settings',
    slug: 'settings',
    Icon: Settings,
    shadowHide: true,
  },
  {
    key: 'help-centers',
    label: 'Help Centers',
    slug: 'help-centers',
    Icon: HelpCircle,
    shadowHide: true,
  },
];

const SidebarLink = ({ label, Icon, isActive, slug, onClick }: SidebarLink) => {
  return (
    <Link
      onClick={onClick}
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
          {sidebarLinks.map(({ key, label, Icon, slug, shadowHide }) => {
            const isCurrentPage = currentPageName === key.toLowerCase();
            if (shadowHide && !isCurrentPage) return;
            return (
              <SidebarLink
                key={`sidebar-link-${key}`}
                label={label}
                Icon={Icon}
                slug={slug}
                isActive={isCurrentPage}
              />
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export const SidebarMobile = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
}) => {
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2];

  return (
    <SlideOver
      isOpen={sidebarOpen}
      closeSlideOver={() => setSidebarOpen(false)}
    >
      <div className="flex flex-col justify-between min-h-screen pb-20">
        <div>
          <div className="flex flex-col gap-3 pt-5 mb-5">
            <div className="px-3">
              <CodeWithUnclebigbayLogo />
            </div>
          </div>

          {sidebarLinks.map(({ key, label, Icon, slug, shadowHide }) => {
            const isCurrentPage = currentPageName === key.toLowerCase();
            if (shadowHide && !isCurrentPage) return;
            return (
              <SidebarLink
                key={`sidebar-link-${key}`}
                label={label}
                Icon={Icon}
                slug={slug}
                isActive={currentPageName === key.toLowerCase()}
                onClick={() =>
                  setTimeout(() => {
                    setSidebarOpen(false);
                  }, 100)
                }
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <IconButton
            Icon={XMark}
            size="xs"
            appearance="secondary"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      </div>
    </SlideOver>
  );
};
