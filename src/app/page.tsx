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
import { Hackathon, Students } from '@/utils/types';
import { baseURL } from '../../frontend.config';
import { Session } from 'next-auth';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { getCustomHeaders } from '@/utils/server.service';

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

type GetStudentsResponse = { students: Students };
export async function getStudents(): Promise<GetStudentsResponse | undefined> {
  const url = `${baseURL}/api/students`;
  const result = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) return undefined;

  const students = await result.json();
  return students;
}

type GetCurrentHackathonResponse = {
  hackathon: Hackathon;
  session: Session | null;
};

export async function getCurrentHackathon(): Promise<
  GetCurrentHackathonResponse | undefined
> {
  const session = await getServerSessionWithAuthOptions();
  const url = `${baseURL}/api/hackathons/current-hackathon`;
  const result = await fetch(url, {
    headers: getCustomHeaders(),
    cache: 'force-cache',
  });
  const { hackathon } = await result.json();

  if (!hackathon) return undefined;

  return { hackathon, session };
}

const Page = async () => {
  const [studentsRes, currentHackathonRes] = await Promise.all([
    getStudents(),
    getCurrentHackathon(),
  ]);
  const students = studentsRes?.students;
  const hackathon = currentHackathonRes?.hackathon;
  const session = currentHackathonRes?.session;

  const showStudentCommunity = students && students.length > 0;
  const showHackathonWidget = !!hackathon;
  const showNavbar = !!session;

  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-10 overflow-hidden">
        <div>
          <h3>New</h3>
          {showNavbar && <Navbar session={session} />}
          {showHackathonWidget && <HackathonWidget hackathon={hackathon} />}
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
          {showStudentCommunity ? (
            <CommunityMembersSection students={students} />
          ) : null}
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
