import React from 'react';
import { SlideOver, SlideOverHeader } from './SlideOver';
import { CodeWithUnclebigbayLogo } from './CodeWithUnclebigbayLogo';
import { navLinks } from '@/lib/links';
import { Button } from './Button';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const SidebarSlideOver = ({ isOpen, close }: Props) => {
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
    </SlideOver>
  );
};
