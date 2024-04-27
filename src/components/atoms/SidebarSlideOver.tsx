import React from 'react';
import { SlideOver, SlideOverHeader } from './SlideOver';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/utils/links';
import { Button } from './Button';
import Link from 'next/link';
import { handleAuthentication } from '@/utils/auth';
import { Session } from 'next-auth';

type Props = {
  isOpen: boolean;
  close: () => void;
  session: Session | null;
};

export const SidebarSlideOver = ({ isOpen, close, session }: Props) => {
  return (
    <SlideOver isOpen={isOpen} closeSlideOver={close}>
      <div className="flex items-center justify-between pl-5 pt-5 mb-5">
        <CodeWithUnclebigbayLogo />
        <SlideOverHeader borderless />
      </div>

      {navLinks.map(({ label, url }, index) => (
        <div className="border-b ml-5" key={`big-screen-nav-links-${index}`}>
          <Button
            size="md"
            appearance="link-secondary"
            padding="none"
            width="full"
          >
            <Link className="text-left w-full" href={url}>
              {label}
            </Link>
          </Button>
        </div>
      ))}

      <section className="sm:block w-[163px] ml-5">
        {session ? (
          <Button
            size="md"
            appearance="link-secondary"
            width="full"
            padding="none"
          >
            <Link
              href="/dashboard/overview"
              className="text-left block w-full text-black"
            >
              Dashboard
            </Link>
          </Button>
        ) : (
          <section className="">
            <Button
              size="md"
              onClick={() => handleAuthentication()}
              appearance="link-secondary"
              width="full"
              padding="none"
            >
              <span className="text-left block w-full text-black">Sign in</span>
            </Button>
          </section>
        )}
      </section>
    </SlideOver>
  );
};
