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
import { baseURL } from '../../frontend.config';
import { headers } from 'next/headers';
import { Hackathon } from '@/utils/types';
import { HackathonWidget } from '@/components/molecules/home/HackathonWidget';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Session } from 'next-auth';

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

export async function getCurrentHackathon() {
  try {
    const session = await getServerSessionWithAuthOptions();

    const url = `${baseURL}/api/hackathons/current-hackathon`;
    const result = await fetch(url, {
      headers: headers(),
    });
    const hackathonRes = await result.json();

    console.log('run');
    console.log(hackathonRes);

    const hackathonId = hackathonRes.hackathon._id;
    const isRegisteredUrl = `${baseURL}/api/hackathons/is-registered/${hackathonId}`;
    const isRegisteredResult = await fetch(isRegisteredUrl, {
      headers: headers(),
    });

    const { isRegistered } = await isRegisteredResult.json();

    return { hackathon: hackathonRes.hackathon, isRegistered, session };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Home = async () => {
  const { hackathon, isRegistered, session } =
    (await getCurrentHackathon()) as {
      hackathon: Hackathon;
      isRegistered: boolean;
      session: Session | null;
    };

  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-10 overflow-hidden">
        <div>
          <Navbar session={session} />
          <HackathonWidget hackathon={hackathon} isRegistered={isRegistered} />
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
          <CommunityMembersSection />
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
export default Home;
