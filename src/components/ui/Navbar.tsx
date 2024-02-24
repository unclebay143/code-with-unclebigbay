'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './Button';
import { Bar3CenterLeft } from '../icons/Bar3CenterLeft';
import { IconButton } from './IconButton';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/lib/links';
import { SidebarSlideOver } from './SidebarSlideOver';
import { SectionWrapper } from '../home';
import { signIn } from 'next-auth/react';

type Props = {
  isLoggedIn?: boolean;
};

export const Navbar = ({ isLoggedIn }: Props) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
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
            <section className="hidden sm:block">
              {isLoggedIn ? (
                <Button size="xs" asChild>
                  <Link href="/dashboard/overview">Dashboard</Link>
                </Button>
              ) : (
                <section className="flex gap-1 items-center">
                  <Button
                    size="sm"
                    onClick={() =>
                      signIn('github', {
                        callbackUrl: `${window.location.origin}/dashboard`,
                      })
                    }
                    appearance="link-secondary"
                  >
                    Sign in
                  </Button>
                  <Button
                    size="xs"
                    onClick={() =>
                      signIn('github', {
                        callbackUrl: `${window.location.origin}/dashboard`,
                      })
                    }
                  >
                    Sign up
                  </Button>
                </section>
              )}
            </section>
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
