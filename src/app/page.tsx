import { ChannelIntroVideoSection } from '@/components/home/ChannelIntroVideoSection';
import { CommunityMembersSection } from '@/components/home/CommunityMembersSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { CoursesCardGroup } from '@/components/ui/CoursesCardGroup';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { SectionWrapper } from '@/components/home';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-10">
        <Navbar isLoggedIn={!!session} />
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
        <section></section>
        <SectionWrapper>
          <Footer />
        </SectionWrapper>
      </section>
    </main>
  );
}
