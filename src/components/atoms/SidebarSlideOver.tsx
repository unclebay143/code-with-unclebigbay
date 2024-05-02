import React from 'react';
// import { SlideOver, SlideOverHeader } from './SlideOver';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/utils/links';
import Link from 'next/link';
import { handleAuthentication } from '@/utils/auth';
import { Session } from 'next-auth';
import {
  Button,
  IconButton,
  SlideoverPanel,
  SlideoverPanelBody,
  X,
} from '@hashnode/matrix-ui';

type Props = {
  isOpen: boolean;
  close: () => void;
  session?: Session | null;
};

export const SidebarSlideOver = ({ isOpen, close, session }: Props) => {
  return (
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
            <section className="">
              <Button
                size="md"
                onClick={() => handleAuthentication()}
                appearance="link-slate"
              >
                Sign in
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
  );
};
