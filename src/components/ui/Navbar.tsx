'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './Button';
import { SlideOver, SlideOverHeader } from './SlideOver';
import { Bar3CenterLeft } from '../icons/Bar3CenterLeft';
import { IconButton } from './IconButton';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/utils/links';
import { SidebarSlideOver } from './SidebarSlideOver';
import { ResponsiveWrapper } from '@/utils/styles';

type Props = {
  isLoggedIn: boolean;
};

export const Navbar = ({ isLoggedIn = true }: Props) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  return (
    <nav>
      <ResponsiveWrapper>
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
                  <Link href="">Dashboard</Link>
                </Button>
              ) : (
                <section className="flex gap-3">
                  <Button size="xs" asChild>
                    <Link href="">Sign in</Link>
                  </Button>
                  <Button size="xs" asChild>
                    <Link href="">Sign up</Link>
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
      </ResponsiveWrapper>
    </nav>
  );
};
