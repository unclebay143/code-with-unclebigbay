'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/utils/links';
import { SidebarSlideOver } from './SidebarSlideOver';
import { SectionWrapper } from '../molecules/home';
import {
  Badge,
  BarsHamburger,
  Button,
  HeaderNavigationButton,
  IconButton,
} from '@hashnode/matrix-ui';
import { Session } from 'next-auth';
import { AuthModal } from './AuthModal';

export const Navbar = ({ session }: { session?: Session | null }) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authenticationType, setAuthenticationType] = useState<
    'login' | 'signup'
  >('login');

  return (
    <>
      <nav className="sticky top-0 bg-white py-5">
        <section className="flex w-full items-center justify-between">
          <CodeWithUnclebigbayLogo />
          <section className="hidden lg:flex items-center gap-3 text-slate-700">
            {navLinks.map(({ label, url, target, showNewBadge }, index) => (
              <HeaderNavigationButton
                size="lg"
                key={`big-screen-nav-links-${index}`}
                asChild
              >
                <Link href={url} target={target}>
                  <span>{label}</span>
                  {showNewBadge && (
                    <Badge size="xs" theme="green">
                      New
                    </Badge>
                  )}
                </Link>
              </HeaderNavigationButton>
            ))}
          </section>

          <div className="flex sm:gap-4 items-center">
            <section>
              {session ? (
                <div className="hidden sm:flex justify-end">
                  <Button size="xs" appearance="primary-slate" asChild>
                    <Link href="/overview">Dashboard</Link>
                  </Button>
                </div>
              ) : (
                <section className="flex gap-1.5 items-center">
                  <div className="hidden min-[374px]:block">
                    <Button
                      size="xs"
                      onClick={() => {
                        setOpenAuthModal(true);
                        setAuthenticationType('login');
                      }}
                      appearance="link-secondary"
                    >
                      Sign in
                    </Button>
                  </div>
                  <div className="hidden sm:block">
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
                  </div>
                </section>
              )}
            </section>
            <section className="lg:hidden">
              <IconButton
                size="xs"
                onClick={() => setSidebarVisibility(true)}
                Icon={BarsHamburger}
              />
            </section>
          </div>
        </section>
      </nav>
      <SidebarSlideOver
        isOpen={sidebarVisibility}
        close={() => setSidebarVisibility(false)}
        session={session}
      />

      <AuthModal
        isOpen={openAuthModal}
        close={() => setOpenAuthModal(false)}
        type={authenticationType}
      />
    </>
  );
};
