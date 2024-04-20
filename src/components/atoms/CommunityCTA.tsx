'use client';
import React from 'react';
import { Button } from '@hashnode/matrix-ui';

type Props = {};

export const CommunityCTA = (props: Props) => {
  return (
    <section className="rounded-lg mt-40 bg-slate-950 py-20 px-5 sm:p-20 flex gap-8 flex-col items-center justify-center">
      <h3 className="text-center text-white text-4xl">
        We can&apos;t wait to see what you&apos;ll build 👋🏽
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 dark">
        <Button appearance="primary-slate">Get started</Button>
        <Button appearance="primary-slate">Join the Community</Button>
      </div>
    </section>
  );
};
