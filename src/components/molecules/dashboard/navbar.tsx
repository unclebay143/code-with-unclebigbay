'use client';

import React, { useState } from 'react';
import type { Session } from 'next-auth';
import Image from 'next/image';
import { CodeWithUnclebigbayLogo } from '../../atoms/CodeWithUnclebigbayLogo';
import { ChevronDown } from 'lucide-react';

import { handleLogout } from '@/utils/auth';
import { Student } from '@/utils/types';
import {
  ArrowExternalLink01,
  ArrowLogout,
  BarsHamburger,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItemButton,
  DropdownMenuItemLink,
  DropdownMenuTrigger,
  HelpCircle,
  IconButton,
  SettingsGear,
} from '@hashnode/matrix-ui';
import { AuthModal } from '@/components/atoms/AuthModal';
import Link from 'next/link';

type Props = {
  session: Session | null;
  setSidebarOpen: Function;
  currentStudent: Student;
};

export const Navbar = ({ session, setSidebarOpen, currentStudent }: Props) => {
  const user = session?.user;
  const isOnboardingCompleted = !!currentStudent?.stack;
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authenticationType, setAuthenticationType] = useState<
    'login' | 'signup'
  >('login');

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white p-4 lg:py-5 lg:px-5 border-b">
        <section className="max-w-7xl mx-auto flex w-full items-center justify-between">
          <div className="hidden lg:block">
            <CodeWithUnclebigbayLogo />
          </div>
          <div className="lg:hidden">
            <IconButton
              size="xs"
              onClick={() => setSidebarOpen(true)}
              Icon={BarsHamburger}
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
                    <DropdownMenuContent
                      hideWhenDetached
                      sideOffset={8}
                      align="end"
                    >
                      <Link
                        href={`/@${currentStudent.username}`}
                        className="px-4 pb-1 pt-2 flex flex-col hover:bg-slate-100"
                      >
                        <h3 className="truncate text-sm font-medium text-slate-900">
                          {user?.name}
                        </h3>
                        <span className="truncate text-xs text-slate-500">
                          {user?.email}
                        </span>
                      </Link>
                      <DropdownMenuItemLink
                        text="Settings"
                        startIcon={SettingsGear}
                        href="/dashboard/settings"
                      />
                      <DropdownMenuItemLink
                        text="Help Centers"
                        startIcon={HelpCircle}
                        href="/dashboard/help-centers"
                      />
                      <DropdownMenuItemButton
                        text="Sign out"
                        startIcon={ArrowLogout}
                        onClick={() => handleLogout()}
                      />
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </section>
            ) : (
              <section className="flex gap-1.5 items-center">
                <Button
                  size="sm"
                  onClick={() => {
                    setOpenAuthModal(true);
                    setAuthenticationType('login');
                  }}
                  appearance="link-secondary"
                >
                  Sign in
                </Button>
                <Button
                  size="xs"
                  appearance="primary-slate"
                  onClick={() => {
                    setOpenAuthModal(true);
                    setAuthenticationType('signup');
                  }}
                >
                  Sign up
                </Button>
              </section>
            )}
          </section>
        </section>
      </nav>
      <AuthModal
        isOpen={openAuthModal}
        close={() => setOpenAuthModal(false)}
        type={authenticationType}
        nextUrl={
          typeof window !== 'undefined' ? window.location.href : undefined
        }
      />
    </>
  );
};
