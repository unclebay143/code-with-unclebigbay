import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlideOver } from '../../atoms/SlideOver';
import { CodeWithUnclebigbayLogo } from '../../atoms/CodeWithUnclebigbayLogo';
import { IconButton } from '../../atoms/IconButton';
import { XMark } from '../../icons/XMark';
import { SidebarLink } from '@/utils/types';
import { sidebarLinks } from '@/utils/consts/links';

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

export const Sidebar = ({ isAdmin }: { isAdmin?: boolean }) => {
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2];

  return (
    <aside className="hidden lg:flex">
      <nav>
        <div className="transition-all w-0 lg:w-[270px]" />
        <div className="border rounded-lg flex flex-col gap-1 px-2 fixed py-4 z-10 bg-white dark:bg-slate-950 w-[270px]">
          {sidebarLinks.map(
            ({ key, label, Icon, slug, shadowHide, adminAccess }) => {
              const isCurrentPage = currentPageName === key.toLowerCase();
              const requireAdminAccess = adminAccess && !isAdmin;
              const shadowHidden = shadowHide && !isCurrentPage;
              const shouldHideLink = shadowHidden || requireAdminAccess;
              if (shouldHideLink) return;
              return (
                <SidebarLink
                  key={`sidebar-link-${key}`}
                  label={label}
                  Icon={Icon}
                  slug={slug}
                  isActive={isCurrentPage}
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
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
  isAdmin?: boolean;
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
            ({ key, label, Icon, slug, shadowHide, adminAccess }) => {
              const isCurrentPage = currentPageName === key.toLowerCase();
              const shouldHideLink =
                (shadowHide && !isCurrentPage) || (adminAccess && !isAdmin);
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
