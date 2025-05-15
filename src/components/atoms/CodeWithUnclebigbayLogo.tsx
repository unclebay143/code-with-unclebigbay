'use client';

import Image from 'next/image';
import Link from 'next/link';

export const CodeWithUnclebigbayLogo = () => (
  <Link href="/" className="flex items-end gap-1.5">
    <div className="h-9 w-9 overflow-hidden rounded-full">
      <Image
        // src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg"
        src="https://cdn.hashnode.com/res/hashnode/image/upload/v1735921412252/469092a2-08d5-40c6-be61-289fafa51244.png?auto=compress"
        alt="Unclebigbay"
        width={100}
        height={100}
      />
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <h2 className="text-sm font-semibold">Code with Unclebigbay</h2>
      </div>
      <span className="text-xs font-medium text-slate-600">
        Learn<span className="mx-1">&middot;</span>Practice
        <span className="mx-1">&middot;</span>Build
      </span>
    </div>
  </Link>
);
