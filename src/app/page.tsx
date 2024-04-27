import { Metadata } from 'next';
import { ChannelIntroVideoSection } from '@/components/molecules/home/ChannelIntroVideoSection';
import { CommunityMembersSection } from '@/components/molecules/home/CommunityMembersSection';
import { TestimonialSection } from '@/components/molecules/home/TestimonialSection';
import { CoursesCardGroup } from '@/components/atoms/CoursesCardGroup';
import { Navbar } from '@/components/atoms/Navbar';
import { Footer } from '@/components/atoms/Footer';
import { HeroSection } from '@/components/molecules/home/HeroSection';
import { SectionWrapper } from '@/components/molecules/home';
import { Meteors } from '@/components/atoms/meteors';
import { CommunityCTA } from '@/components/atoms/CommunityCTA';
import { HackathonWidget } from '@/components/molecules/home/HackathonWidget';
import { getCurrentHackathon, getStudents } from '@/utils/server.service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

const Page = async () => {
  const studentsRes = await getStudents();
  const students = studentsRes?.students;
  const currentHackathonRes = await getCurrentHackathon();
  const hackathon = currentHackathonRes?.hackathon;
  const session = currentHackathonRes?.session;

  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-10 overflow-hidden">
        <div>
          <Navbar session={session!} />
          <HackathonWidget hackathon={hackathon!} />
        </div>
        <SectionWrapper>
          <Meteors />
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
          <CommunityMembersSection students={students!} />
        </SectionWrapper>
        <SectionWrapper>
          <CommunityCTA />
        </SectionWrapper>
        <SectionWrapper>
          <Meteors />
          <Footer />
        </SectionWrapper>
      </section>
    </main>
  );
};
export default Page;
