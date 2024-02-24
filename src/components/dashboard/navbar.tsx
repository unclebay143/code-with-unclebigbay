import React from 'react';
import { CodeWithUnclebigbayLogo } from '../ui/CodeWithUnclebigbayLogo';

import Image from 'next/image';
import type { Session } from 'next-auth';
import { ChevronDown } from 'lucide-react';

type Props = {
  session?: Session | null;
};

export const Navbar = ({ session }: Props) => {
  const { user } = session;
  return (
    <nav className="sticky top-0 bg-white z-50 py-5 px-5 border-b">
      <section className="flex w-full items-center justify-between">
        <CodeWithUnclebigbayLogo />

        <div className="flex gap-4 items-center">
          <section className="hidden sm:block">
            <section className="relative border p-0.5 rounded-full">
              <button className="flex h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src={user?.image}
                  alt={user?.name}
                  width={100}
                  height={100}
                />
                <div className="absolute z-50 bottom-0 right-0 border ring-1 ring-slate-50 rounded-lg bg-slate-200">
                  <ChevronDown size="12" />
                </div>
              </button>
            </section>
          </section>
        </div>
      </section>
    </nav>
  );
};
