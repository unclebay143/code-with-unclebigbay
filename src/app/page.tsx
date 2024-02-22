import { ChannelIntroVideoSection } from '@/components/home/ChannelIntroVideoSection';
import { CommunityMembersSection } from '@/components/home/CommunityMembersSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { CoursesCardGroup } from '@/components/ui/CoursesCardGroup';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HeroSection } from '@/components/home/HeroSection';

export const HomeSectionHeading = ({
  heading,
  copy,
}: {
  heading: React.ReactNode;
  copy?: string;
}) => {
  return (
    <section className="max-w-xl mx-auto flex gap-6 flex-col text-center text-slate-600">
      <h1 className="text-4xl font-medium leading-10">{heading}</h1>
      {copy && <p className="sm:text-lg">{copy}</p>}
    </section>
  );
};

export default function Home() {
  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <section className="flex flex-col gap-20">
        <Navbar />
        <div className="flex flex-col gap-10">
          <HeroSection />
          <CoursesCardGroup />
          <ChannelIntroVideoSection />
          <TestimonialSection />
          <CommunityMembersSection />
        </div>

        <Footer />
      </section>
    </main>
  );
}
