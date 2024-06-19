'use client';

import Link from 'next/link';
import React from 'react';
import {
  BrandXTwitter,
  BrandYoutube,
  Button,
  IconButton,
  Linkedin,
} from '@hashnode/matrix-ui';

export const Footer = () => {
  return (
    <footer className="pt-[60vh] flex flex-col gap-6">
      <section className=" text-zinc-300 text-center flex flex-col justify-end items-center">
        <h2>[This Space Is Intentionally Left Blank]</h2>
        <p className="italic">
          The bottom of every page is padded so you can maintain a consistent
          eye-line.
        </p>
      </section>
      <section className="py-5 border-t flex flex-col gap-3 justify-center items-center sm:flex-row sm:justify-between sm:items-center">
        <p className="text-slate-700 text-sm">
          &copy; Walk-In Tech. All rights reserved
        </p>
        <div className="flex items-center gap-1 text-slate-600">
          {/* <h3 className="text-slate-600 text-sm">Let&apos;s connect:</h3> */}
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <Button
              size="sm"
              endIcon={BrandYoutube}
              appearance="secondary-slate"
            >
              <a target="_blank" rel="noopener" href="https://dub.sh/GmBzY6T">
                Subscribe to YouTube Channel
              </a>
            </Button>
            <Link target="_blank" rel="noopener" href="https://dub.sh/8gSe15J">
              <IconButton
                Icon={BrandXTwitter}
                appearance="secondary"
                size="sm"
              />
            </Link>
            <Link target="_blank" rel="noopener" href="https://dub.sh/LJOPAON">
              <IconButton Icon={Linkedin} appearance="secondary" size="sm" />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};
