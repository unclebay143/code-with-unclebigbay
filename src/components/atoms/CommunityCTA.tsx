'use client';

import React from 'react';
import { Button } from '@hashnode/matrix-ui';
import Link from 'next/link';
import { handleAuthentication } from '@/utils/auth';
import { Session } from 'next-auth';

type Props = { session?: Session | null };

export const CommunityCTA = ({ session }: Props) => {
  return (
    <section className="rounded-lg mt-40 bg-slate-950 py-20 px-5 sm:p-20 flex gap-8 flex-col items-center justify-center">
      <h3 className="text-center text-white text-4xl">
        We can&apos;t wait to see what you&apos;ll build 👋🏽
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 dark">
        {session ? (
          <Button appearance="primary-slate" asChild>
            <Link href="/dashboard/courses">View courses</Link>
          </Button>
        ) : (
          <Button
            appearance="primary-slate"
            onClick={() => handleAuthentication()}
          >
            Get started
          </Button>
        )}
        <Button appearance="primary-slate" asChild>
          <Link href="/dashboard/help-centers">Join the Community</Link>
        </Button>
      </div>
    </section>
  );
};
