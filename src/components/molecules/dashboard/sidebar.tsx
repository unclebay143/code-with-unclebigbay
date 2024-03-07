import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlideOver } from '../../atoms/SlideOver';
import { CodeWithUnclebigbayLogo } from '../../atoms/CodeWithUnclebigbayLogo';
import { IconButton } from '../../atoms/IconButton';
import { XMark } from '../../icons/XMark';
import { SidebarLink } from '@/utils/types';
import { sidebarLinks } from '@/utils/consts/links';
import { Tooltip } from '@/components/atoms/Tooltip';

const SidebarLink = ({
  label,
  Icon,
  isActive,
  slug,
  onClick,
  requireAuth,
  disabled,
}: SidebarLink) => {
  const Component = disabled ? 'button' : Link;
  const componentProps = disabled
    ? {}
    : { onClick: onClick, href: `/dashboard/${slug}` };
  return (
    <Tooltip tooltip={requireAuth ? 'Sign in required' : null}>
      {/* @ts-ignore */}
      <Component
        {...componentProps}
        className={`p-3 capitalize rounded-md flex items-center gap-1.5 text-sm text-slate-600 hover:bg-slate-100 w-full ${isActive && 'bg-slate-100 text-slate-950 font-medium'} ${disabled && 'bg-white border-slate-200 cursor-not-allowed text-slate-300'}`}
      >
        <span>
          <Icon size="18" />
        </span>
        <span>{label}</span>
      </Component>
    </Tooltip>
  );
};

export const Sidebar = ({
  isAdmin,
  isLoggedIn,
}: {
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}) => {
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2];

  return (
    <aside className="hidden lg:flex">
      <nav>
        <div className="transition-all w-0 lg:w-[270px]" />
        <div className="border rounded-lg flex flex-col gap-1 px-2 fixed py-4 z-10 bg-white dark:bg-slate-950 w-[270px]">
          {sidebarLinks.map(
            ({
              key,
              label,
              Icon,
              slug,
              shadowHide,
              adminAccess,
              requireAuth,
            }) => {
              const isCurrentPage = currentPageName === key.toLowerCase();
              const requireAdminAccess = adminAccess && !isAdmin;
              const shadowHidden = shadowHide && !isCurrentPage;
              const shouldHideLink = shadowHidden || requireAdminAccess;
              const _requireAuth = !isLoggedIn && requireAuth;

              if (shouldHideLink) return;
              return (
                <SidebarLink
                  key={`sidebar-link-${key}`}
                  label={label}
                  Icon={Icon}
                  slug={slug}
                  isActive={isCurrentPage}
                  requireAuth={_requireAuth}
                  disabled={_requireAuth}
                />
              );
            },
          )}
        </div>
      </nav>
    </aside>
  );
};

export const SidebarMobile = ({
  sidebarOpen,
  setSidebarOpen,
  isAdmin,
  isLoggedIn,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
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

          {sidebarLinks.map(
            ({
              key,
              label,
              Icon,
              slug,
              shadowHide,
              adminAccess,
              requireAuth,
            }) => {
              const isCurrentPage = currentPageName === key.toLowerCase();
              const shouldHideLink =
                (shadowHide && !isCurrentPage) || (adminAccess && !isAdmin);
              const showRequireAuthMessage = !isLoggedIn && requireAuth;
              if (shouldHideLink) return;
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
                  requireAuth={showRequireAuthMessage}
                />
              );
            },
          )}
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
