import { CoursesCardGroup } from '@/components/ui/CoursesCardGroup';
import { Navbar } from '@/components/ui/Navbar';
import { YTVideo } from '@/components/ui/YTVideo';
import { ResponsiveWrapper } from '@/utils/styles';

export default function Home() {
  return (
    <main>
      <Navbar />
      <ResponsiveWrapper>
        <div className="mt-10">
          <h1 className="text-center text-5xl max-w-lg leading-[60px] font-medium text-slate-800 mx-auto">
            Learn to Code and Build Your Career
          </h1>
        </div>
        <CoursesCardGroup />
        <section className="mt-10 rounded overflow-hidden">
          <YTVideo embedURL="https://www.youtube.com/embed/JH77WsDH8yY" />
        </section>
      </ResponsiveWrapper>
    </main>
  );
}
