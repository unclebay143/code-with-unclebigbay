import React from 'react';
import { YTVideo } from '../../atoms/YTVideo';
import { SectionWrapper } from '.';
import { ONBOARDING_YT_VIDEO_ID } from '@/utils';

export const ChannelIntroVideoSection = () => {
  return (
    <section className="mt-14 px-5 xl:px-0 py-20 bg-[url('https://cdn.hashnode.com/res/hashnode/image/upload/v1708541386511/29b489ee-ae8f-482d-bdff-9c4cded0e926.png')] bg-cover">
      <SectionWrapper>
        <section className="flex flex-col gap-10 relative z-30">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h3 className="text-slate-400 text-lg">Hi</h3>
            <span className="text-slate-300 text-xl">
              I&apos;m Uncle&apos;Big&apos;Bay
            </span>
          </div>
          <section className="rounded-lg overflow-hidden ring-1 ring-slate-800">
            <YTVideo ytVideoId={ONBOARDING_YT_VIDEO_ID} />
          </section>
        </section>
      </SectionWrapper>
    </section>
  );
};
