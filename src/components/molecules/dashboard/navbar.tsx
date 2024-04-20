import React from 'react';
import type { Session } from 'next-auth';
import Image from 'next/image';
import { CodeWithUnclebigbayLogo } from '../../atoms/CodeWithUnclebigbayLogo';
import { ChevronDown, HelpCircle, LogOut, Menu, Settings } from 'lucide-react';
import { MenuButton } from './menu-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../atoms/DropdownMenu';
import { handleAuthentication, handleLogout } from '@/utils/auth';
import { IconButton } from '../../atoms/IconButton';
import { Bar3CenterLeft } from '../../icons/Bar3CenterLeft';
import { Student } from '@/utils/types';

type Props = {
  session: Session | null;
  setSidebarOpen: Function;
  currentStudent: Student;
};

export const Navbar = ({ session, setSidebarOpen, currentStudent }: Props) => {
  const user = session?.user;
  const isOnboardingCompleted = !!currentStudent?.stack;
  return (
    <nav className="sticky top-0 z-30 bg-white p-4 lg:py-5 lg:px-5 border-b">
      <section className="max-w-7xl mx-auto flex w-full items-center justify-between">
        <div className="hidden lg:block">
          <CodeWithUnclebigbayLogo />
        </div>
        <div className="lg:hidden">
          <IconButton
            size="xs"
            onClick={() => setSidebarOpen(true)}
            Icon={Bar3CenterLeft}
          />
        </div>
        <section>
          {user ? (
            <section className="relative border p-0.5 rounded-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-9 w-9 overflow-hidden rounded-full hover:opacity-90">
                    <>
                      <Image
                        src={user?.image}
                        alt={user?.name}
                        width={100}
                        height={100}
                        priority
                      />
                      {isOnboardingCompleted && (
                        <div className="absolute z-50 bottom-0 right-0 border ring-1 ring-slate-50 rounded-lg bg-slate-200">
                          <ChevronDown size="12" />
                        </div>
                      )}
                    </>
                  </button>
                </DropdownMenuTrigger>
                {isOnboardingCompleted && (
                  <DropdownMenuContent>
                    <section className="p-2 flex flex-col">
                      <h3 className="truncate text-sm font-medium text-slate-900">
                        {user?.name}
                      </h3>
                      <span className="truncate text-xs text-slate-500">
                        {user?.email}
                      </span>
                    </section>

                    <MenuButton
                      label="Settings"
                      Icon={Settings}
                      url="/dashboard/settings"
                    />
                    <MenuButton
                      label="Help Centers"
                      Icon={HelpCircle}
                      url="/dashboard/help-centers"
                    />
                    <MenuButton
                      label="Sign out"
                      Icon={LogOut}
                      onClick={() => handleLogout()}
                    />
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </section>
          ) : (
            <Button
              size="xs"
              onClick={() =>
                handleAuthentication({ nextUrl: window.location.href })
              }
            >
              Sign in
            </Button>
          )}
        </section>
      </section>
    </nav>
  );
};
