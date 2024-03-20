import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlideOver } from '../../atoms/SlideOver';
import { CodeWithUnclebigbayLogo } from '../../atoms/CodeWithUnclebigbayLogo';
import { IconButton } from '../../atoms/IconButton';
import { XMark } from '../../icons/XMark';
import { SidebarLink } from '@/utils/types';
import { sidebarLinks } from '@/utils/consts/links';

const SidebarLink = ({
  label,
  Icon,
  isActive,
  slug,
  onClick,
  disabled,
}: SidebarLink) => {
  const Component = disabled ? 'button' : Link;
  const componentProps = disabled
    ? {}
    : { onClick: onClick, href: `/dashboard/${slug}` };
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
      </Component>
    </>
  );
};

export const Sidebar = ({
  isAdmin,
  isLoggedIn,
  isOnboardingCompleted,
}: {
  isAdmin?: boolean;
  isLoggedIn?: boolean;
  isOnboardingCompleted?: boolean;
}) => {
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2] || pathname.split('/')[1];

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
              showOnBoard,
              hideAfterOnboard,
            }) => {
              const isCurrentPage = currentPageName === key.toLowerCase();
              const requireAdminAccess = adminAccess && !isAdmin;
              const shadowHidden = shadowHide && !isCurrentPage;
              const hideTillOnboard = !isOnboardingCompleted && !showOnBoard;
              const _hideAfterOnboard =
                isOnboardingCompleted && hideAfterOnboard;
              const shouldHideLink =
                hideTillOnboard ||
                _hideAfterOnboard ||
                shadowHidden ||
                requireAdminAccess;
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
  isOnboardingCompleted,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
  isOnboardingCompleted: boolean;
}) => {
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2];

  return (
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

          {sidebarLinks.map(
            ({
              key,
              label,
              Icon,
              slug,
              shadowHide,
              adminAccess,
              requireAuth,
              showOnBoard,
            }) => {
              const isCurrentPage = currentPageName === key.toLowerCase();
              const hideTillOnboard = !isOnboardingCompleted && !showOnBoard;
              const shouldHideLink =
                hideTillOnboard ||
                (shadowHide && !isCurrentPage) ||
                (adminAccess && !isAdmin);
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
