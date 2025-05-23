import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlideOver } from '../../atoms/SlideOver';
import { CodeWithUnclebigbayLogo } from '../../atoms/CodeWithUnclebigbayLogo';
import { SidebarLinks, getSidebarLinks } from '@/utils/consts/links';
import { Badge } from '@hashnode/matrix-ui';
import { SubscribeCTA } from './subscribe-notification';

const SidebarLink = ({
  label,
  Icon,
  isActive,
  slug,
  onClick,
  disabled,
  showNewBadge,
}: any) => {
  const Component = disabled ? 'button' : Link;
  const componentProps = disabled ? {} : { onClick: onClick, href: `/${slug}` };

  return (
    <>
      {/* @ts-ignore */}
      <Component
        {...componentProps}
        className={`p-3 capitalize rounded-md flex items-center gap-1.5 text-sm hover:bg-slate-100 w-full ${isActive ? 'bg-slate-100 text-slate-800 font-medium' : 'text-slate-600'} ${disabled && 'bg-white border-slate-200 cursor-not-allowed text-slate-300'}`}
      >
        <span>
          <Icon size="18" />
        </span>
        <span>{label}</span>
        {showNewBadge && (
          <Badge theme="green" size="xs">
            new
          </Badge>
        )}
      </Component>
    </>
  );
};

const RenderNavItems = ({
  sidebarLinks,
  currentPageName,
}: {
  sidebarLinks: SidebarLinks;
  currentPageName: string;
}) => {
  return (
    <>
      {sidebarLinks.map(({ key, label, Icon, slug, isNew }) => {
        const isCurrentPage = currentPageName === key.toLowerCase();

        return (
          <SidebarLink
            key={`sidebar-link-${key}`}
            label={label}
            Icon={Icon}
            slug={slug}
            isActive={isCurrentPage}
            showNewBadge={isNew}
          />
        );
      })}
    </>
  );
};

export const Sidebar = ({
  isAdmin,
  isLoggedIn,
  isOnboardingCompleted,
  sidebarOpen,
  setSidebarOpen,
}: {
  isAdmin: boolean;
  isLoggedIn: boolean;
  isOnboardingCompleted: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: Function;
}) => {
  const sidebarLinks = getSidebarLinks({
    isAdmin,
    isLoggedIn,
    isOnboardingCompleted,
  });

  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2] || pathname.split('/')[1];
  const showYTCampaign = isOnboardingCompleted;

  useEffect(() => {
    if (currentPageName) setSidebarOpen(false);
  }, [currentPageName, setSidebarOpen]);

  return (
    <>
      <aside className="hidden lg:flex">
        <nav>
          <div className="transition-all w-0 lg:w-[270px]" />
          <div className="border rounded-xl flex flex-col gap-1 px-2 fixed py-4 z-10 bg-white dark:bg-slate-950 w-[270px]">
            <RenderNavItems
              sidebarLinks={sidebarLinks}
              currentPageName={currentPageName}
            />
            {showYTCampaign && <SubscribeCTA />}
          </div>
        </nav>
      </aside>

      <SlideOver
        isOpen={sidebarOpen}
        closeSlideOver={() => setSidebarOpen(false)}
      >
        <div className="flex flex-col justify-between pb-20">
          <div>
            <div className="flex flex-col gap-3 pt-5 mb-5">
              <div className="px-3">
                <CodeWithUnclebigbayLogo />
              </div>
            </div>

            <RenderNavItems
              sidebarLinks={sidebarLinks}
              currentPageName={currentPageName}
            />
          </div>
        </div>
      </SlideOver>
    </>
  );
};
