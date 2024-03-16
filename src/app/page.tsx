import { Metadata } from 'next';
import { ChannelIntroVideoSection } from '@/components/molecules/home/ChannelIntroVideoSection';
import { CommunityMembersSection } from '@/components/molecules/home/CommunityMembersSection';
import { TestimonialSection } from '@/components/molecules/home/TestimonialSection';
import { CoursesCardGroup } from '@/components/atoms/CoursesCardGroup';
import { Navbar } from '@/components/atoms/Navbar';
import { Footer } from '@/components/atoms/Footer';
import { HeroSection } from '@/components/molecules/home/HeroSection';
import { SectionWrapper } from '@/components/molecules/home';
import { Button } from '@/components/atoms/Button';

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

export default function Home() {
  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-10">
        <Navbar />
        <SectionWrapper>
          <HeroSection />
        </SectionWrapper>
        <SectionWrapper>
          <CoursesCardGroup />
        </SectionWrapper>
        <ChannelIntroVideoSection />
        <SectionWrapper>
          <TestimonialSection />
        </SectionWrapper>
        <SectionWrapper>
          <CommunityMembersSection />
        </SectionWrapper>
        <SectionWrapper>
          <section className="rounded-lg mt-40 bg-slate-950 py-20 px-5 sm:p-20 flex gap-8 flex-col items-center justify-center">
            <h3 className="text-center text-white text-4xl">
              We can&apos;t wait to see what you&apos;ll build
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button appearance="secondary-slate">Get started</Button>
              <Button appearance="secondary-slate">Join Community</Button>
            </div>
          </section>
        </SectionWrapper>
        <SectionWrapper>
          <Footer />
        </SectionWrapper>
      </section>
    </main>
  );
}
