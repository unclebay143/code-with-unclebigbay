'use client';

import Link from 'next/link';
import React from 'react';
import { ChevronRight } from '../../icons/ChevronRight';
import { ArrowRight } from '../../icons/ArrowRight';
import { Button } from '@/components/atoms/Button';
import { handleAuthentication } from '@/utils/auth';

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-3 mt-2">
      <Link
        target="_blank"
        href="https://youtube.com/@unclebigbay"
        className="group border rounded-full"
      >
        <div className="hover:bg-slate-50 rounded-full py-2 px-4 flex items-center gap-1.5">
          <span className="capitalize font-medium text-sm text-slate-700">
            Watch latest tutorial video
          </span>
          <div className="animate-pulse">
            <span className="transition-all group-hover:translate-x-1 group-hover:hidden">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span className="transition-all group-hover:translate-x-1 hidden group-hover:inline">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
      <h1 className="text-center text-4xl leading-[48px] max-w-[379px] md:text-5xl md:leading-[60px] font-medium text-slate-800 mx-auto md:max-w-lg">
        Learn to Code and Build Your Career
      </h1>
      <Button size="sm" onClick={handleAuthentication}>
        Get started
      </Button>
    </section>
  );
};
