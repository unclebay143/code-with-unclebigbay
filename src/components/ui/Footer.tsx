import Link from 'next/link';
import React from 'react';
import { YouTubeBlackAndWhite } from '../icons/YouTubeBlackAndWhite';
import { X } from '../icons/X';
import { LinkedIn } from '../icons/LinkedIn';

export const Footer = () => {
  return (
    <footer className="pt-[60vh] flex flex-col gap-6">
      <section className="text-center flex flex-col justify-end items-center">
        <h2 className="text-slate-300">
          [This Space Intentionally Left Blank]
        </h2>
        <p className="text-slate-300 italic">
          The bottom of every page is padded so readers can maintain a
          consistent eyeline.
        </p>
      </section>
      <section className="py-5 border-t flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-slate-700 text-sm">
          &copy; Walk-In Tech. All rights reserved
        </p>
        <div className="flex items-center gap-1 text-slate-600">
          {/* <h3 className="text-slate-600 text-sm">Let&apos;s connect:</h3> */}
          <div className="flex gap-1">
            <Link
              target="_blank"
              href="https://dub.sh/6kwtDXT"
              className="border rounded-full p-2 hover:bg-slate-100"
            >
              <YouTubeBlackAndWhite className="h-4 w-4" />
            </Link>
            <Link
              target="_blank"
              href="https://dub.sh/8gSe15J"
              className="border rounded-full p-2 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </Link>
            <Link
              target="_blank"
              href="https://dub.sh/LJOPAON"
              className="border rounded-full p-2 hover:bg-slate-100"
            >
              <LinkedIn className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};
