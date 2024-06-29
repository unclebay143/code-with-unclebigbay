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
// import { HackathonWidget } from '@/components/molecules/home/HackathonWidget';
import { getCurrentHackathon, getStudents } from '@/utils/server.service';
import { Features } from '@/components/molecules/home/Features';

export const metadata: Metadata = {
  alternates: {
    canonical: `/`,
  },
};

const Page = async () => {
  const [studentsRes, currentHackathonRes] = await Promise.all([
    getStudents(),
    getCurrentHackathon(),
  ]);
  const students = studentsRes?.students;
  // const hackathon = currentHackathonRes?.hackathon;
  const session = currentHackathonRes?.session;

  const showStudentCommunity = students && students.length > 0;
  // const hasHackathon = !!hackathon;

  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-10 overflow-hidden">
        <div>
          <Navbar session={session} />
          {/* {hasHackathon && <HackathonWidget hackathon={hackathon} />} */}
        </div>

        <SectionWrapper>
          <Meteors />
          <HeroSection session={session} />
        </SectionWrapper>

        <SectionWrapper>
          <CoursesCardGroup />
        </SectionWrapper>

        <ChannelIntroVideoSection />

        <SectionWrapper>
          <TestimonialSection />
        </SectionWrapper>

        <SectionWrapper>
          <Features />
        </SectionWrapper>

        <SectionWrapper>
          {showStudentCommunity ? (
            <CommunityMembersSection students={students} />
          ) : null}
        </SectionWrapper>

        <SectionWrapper>
          <CommunityCTA session={session} />
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
