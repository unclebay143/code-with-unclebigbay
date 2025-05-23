'use client';

import React, { useState } from 'react';
import { Button } from '@hashnode/matrix-ui';
import Link from 'next/link';
import { Session } from 'next-auth';
import { AuthModal } from './AuthModal';

type Props = { session?: Session | null };

export const CommunityCTA = ({ session }: Props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <>
      <section className="rounded-lg mt-10 bg-slate-950 py-20 px-5 sm:p-20 flex gap-8 flex-col items-center justify-center">
        <h3 className="text-center text-white text-4xl">
          {/* We can&apos;t wait to see what you&apos;ll build 👋🏽 */}
          {/* Start your journey today! */}
          Excited to see what you&apos;ll create next! 🚀
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 dark">
          {session ? (
            <Button appearance="primary-slate" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          ) : (
            <Button
              appearance="primary-slate"
              onClick={() => setOpenAuthModal(true)}
            >
              Start for Free
            </Button>
          )}
          <Button appearance="primary-slate" asChild>
            <Link href="/help-centers">Join the Community</Link>
          </Button>
        </div>
      </section>

      <AuthModal
        isOpen={openAuthModal}
        close={() => setOpenAuthModal(false)}
        type={'login'}
      />
    </>
  );
};
