'use client';

import React, { useState } from 'react';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/utils/links';
import Link from 'next/link';
import { Session } from 'next-auth';
import {
  Button,
  IconButton,
  SlideoverPanel,
  SlideoverPanelBody,
  X,
} from '@hashnode/matrix-ui';
import { AuthModal } from './AuthModal';

type Props = {
  isOpen: boolean;
  close: () => void;
  session?: Session | null;
};

export const SidebarSlideOver = ({ isOpen, close, session }: Props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authenticationType, setAuthenticationType] = useState<
    'login' | 'signup'
  >('login');

  return (
    <>
      <SlideoverPanel isOpen={isOpen} closePanel={close}>
        <SlideoverPanelBody>
          <div className="flex items-center justify-between">
            <CodeWithUnclebigbayLogo />
            <IconButton Icon={X} onClick={close} />
          </div>
          <div className="flex flex-col gap-10 mt-10">
            {session ? (
              <Button size="md" appearance="link-slate" asChild>
                <Link href="/dashboard/overview">Dashboard</Link>
              </Button>
            ) : (
              <section className="flex flex-col gap-10">
                <Button
                  size="md"
                  onClick={() => {
                    close();
                    setOpenAuthModal(true);
                    setAuthenticationType('login');
                  }}
                  appearance="link-slate"
                >
                  Sign in
                </Button>
                <Button
                  size="md"
                  onClick={() => {
                    close();
                    setOpenAuthModal(true);
                    setAuthenticationType('signup');
                  }}
                  appearance="link-slate"
                >
                  Sign up
                </Button>
              </section>
            )}

            {navLinks.map(({ label, url }, index) => (
              <div key={`big-screen-nav-links-${index}`}>
                <Button size="md" appearance="link-slate" asChild>
                  <Link href={url}>{label}</Link>
                </Button>
              </div>
            ))}
          </div>
        </SlideoverPanelBody>
      </SlideoverPanel>
      <AuthModal
        isOpen={openAuthModal}
        close={() => setOpenAuthModal(false)}
        type={authenticationType}
      />
    </>
  );
};
