import { LinkedIn } from '@/components/icons/LinkedIn';
import { X } from '@/components/icons/X';
import { YouTubeBlackAndWhite } from '@/components/icons/YouTubeBlackAndWhite';
import { Button } from '@/components/ui/Button';
import { CoursesCardGroup } from '@/components/ui/CoursesCardGroup';
import { IconButton } from '@/components/ui/IconButton';
import { Navbar } from '@/components/ui/Navbar';
import Testimonials from '@/components/ui/Testimonials';
import { YTVideo } from '@/components/ui/YTVideo';
// import { ResponsiveWrapper } from '@/lib/ResponsiveWrapper';
import Image from 'next/image';
import Link from 'next/link';

const communityMember = {
  name: 'Ayodele S. Adebayo',
  stack: 'frontend',
  username: 'unclebigbay',
  photo:
    'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
};

export default function Home() {
  return (
    <main>
      {/* Todo: figure out why ResponsiveWrapper isn't working intermittently */}
      <div className="w-full mx-auto max-w-6xl px-5 py-4">
        <section className="flex flex-col gap-10">
          <Navbar />
          <div className="flex flex-col gap-10">
            <h1 className="text-center text-4xl leading-[48px] md:text-5xl md:leading-[60px] font-medium text-slate-800 mx-auto max-w-lg">
              Learn to Code and Build Your Career
            </h1>
            <CoursesCardGroup />
            <section className="rounded overflow-hidden">
              <YTVideo embedURL="https://www.youtube.com/embed/JH77WsDH8yY" />
            </section>
            <section>
              <Testimonials />
            </section>
            <section className="mt-10 flex flex-col gap-14">
              <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
                <h2 className="font-semibold text-3xl">
                  You are in good company
                </h2>
                <p className="text-xl">
                  Join thousands of aspiring developers on a journey to
                  mastering web development in 2024.
                </p>
                <Button appearance="secondary-slate">Become a Member</Button>
              </div>
              <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8">
                {Array(18)
                  .fill(communityMember)
                  .map(({ name, stack, username, photo }, index) => (
                    <article
                      key={`communityMembers-${index}`}
                      className="flex flex-col gap-3"
                    >
                      <div className="mx-auto rounded-full overflow-hidden h-20 w-20 transition transform duration-500 ease-in-out hover:scale-125 hover:-rotate-3">
                        <Image
                          src={photo}
                          height={80}
                          width={80}
                          className="w-full h-full"
                          alt=""
                        />
                      </div>
                      <Link
                        href={`/@${username}`}
                        className="text-center text-sm"
                      >
                        <h3 className="font-medium text-slate-950 hover:(text-white bg-black)">
                          {name}
                        </h3>
                        <p className="font-semibold text-slate-800">
                          Learning {stack}
                        </p>
                      </Link>
                    </article>
                  ))}
              </section>
            </section>
          </div>
          <footer className="pt-[60vh] flex flex-col gap-6">
            <section className="text-center flex flex-col justify-end items-center">
              <h2 className="text-slate-300">
                [This Space Intentionally Left Blank]
              </h2>
              <p className="text-slate-300 italic">
                The bottom of every page is padded so readers can maintain a
                consistent eyeline.
              </p>
            </section>
            <section className="py-3 border-t flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <p className="text-slate-700 text-sm">
                &copy; Walk-In Tech. All rights reserved
              </p>
              <div className="flex items-center gap-1 text-slate-600">
                <h3 className="text-slate-600 text-sm">Let&apos;s connect:</h3>
                <div className="flex gap-1">
                  <IconButton Icon={YouTubeBlackAndWhite} />
                  <IconButton Icon={X} />
                  <IconButton Icon={LinkedIn} />
                </div>
              </div>
            </section>
          </footer>
        </section>
      </div>
    </main>
  );
}
