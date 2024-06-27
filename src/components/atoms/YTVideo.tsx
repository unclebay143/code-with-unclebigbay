'use client';

import { Spinner } from '@hashnode/matrix-ui';

export function YTVideo({
  ytVideoId,
  removeRounded,
}: {
  ytVideoId: string;
  removeRounded?: boolean;
}) {
  return (
    <div
      className={`relative border-transparent bg-slate-50 aspect-video overflow-hidden ${removeRounded ? '' : 'rounded-lg'}`}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="animate-spin">
          <Spinner />
        </span>
      </div>
      <div className="relative z-[1]">
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${ytVideoId}`}
            title="Learn How to Code in 2024 | Become a Web Developer in 2024 - Your Roadmap Starts Here"
            loading="eager"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
