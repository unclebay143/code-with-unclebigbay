'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './Button';
import { Bar3CenterLeft } from '../icons/Bar3CenterLeft';
import { IconButton } from './IconButton';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/utils/links';
import { SidebarSlideOver } from './SidebarSlideOver';
import { SectionWrapper } from '../molecules/home';
import { handleAuthentication } from '@/utils/auth';
import { useSession } from 'next-auth/react';

export const Navbar = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const { data: session, status } = useSession();
  return (
    <nav className="sticky top-0 bg-white z-50 py-5">
      <SectionWrapper>
        <section className="flex w-full items-center justify-between">
          <CodeWithUnclebigbayLogo />
          <section className="hidden lg:flex items-center gap-3 text-slate-600">
            {navLinks.map(({ label, url }, index) => (
              <Button
                size="sm"
                asChild
                appearance="link-secondary"
                key={`big-screen-nav-links-${index}`}
              >
                <Link href={url}>{label}</Link>
              </Button>
            ))}
          </section>

          <div className="flex gap-4 items-center">
            {status === 'loading' ? (
              <div className="w-[163px] bg-red-200" />
            ) : (
              <section className="hidden sm:block w-[163px]">
                {session ? (
                  <div className="flex justify-end">
                    <Button size="xs" asChild>
                      <Link href="/dashboard/overview">Dashboard</Link>
                    </Button>
                  </div>
                ) : (
                  <section className="flex gap-1 items-center">
                    <Button
                      size="sm"
                      onClick={handleAuthentication}
                      appearance="link-secondary"
                    >
                      Sign in
                    </Button>
                    <Button size="xs" onClick={handleAuthentication}>
                      Sign up
                    </Button>
                  </section>
                )}
              </section>
            )}
            <section className="lg:hidden">
              <IconButton
                size="xs"
                onClick={() => setSidebarVisibility(true)}
                Icon={Bar3CenterLeft}
              />
            </section>
          </div>

          <SidebarSlideOver
            isOpen={sidebarVisibility}
            close={() => setSidebarVisibility(false)}
          />
        </section>
      </SectionWrapper>
    </nav>
  );
};
