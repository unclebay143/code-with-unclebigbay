import { ArrowRight } from '@/components/icons/ArrowRight';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { LinkedIn } from '@/components/icons/LinkedIn';
import { VideoCamera } from '@/components/icons/VideoCamera';
import { X } from '@/components/icons/X';
import { YouTubeBlackAndWhite } from '@/components/icons/YouTubeBlackAndWhite';
import { Button } from '@/components/ui/Button';
import { CoursesCardGroup } from '@/components/ui/CoursesCardGroup';
import { IconButton } from '@/components/ui/IconButton';
import { Navbar } from '@/components/ui/Navbar';
import Testimonials from '@/components/ui/Testimonials';
import { YTVideo } from '@/components/ui/YTVideo';
import Image from 'next/image';
import Link from 'next/link';

const communityMember = {
  name: 'Ayodele S. Adebayo',
  stack: 'frontend',
  username: 'unclebigbay',
  photo:
    'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
};

const SectionHeading = ({
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
          <section className="flex flex-col items-center justify-center gap-3">
            <Link
              target="_blank"
              href="https://youtube.com/@unclebigbay"
              className="group border rounded-full"
            >
              <div className="bg-white rounded-full py-2 px-4 flex items-center gap-1.5">
                <span className="capitalize font-medium text-sm text-slate-700">
                  Watch latest tutorial video
                </span>
                <div className="animate-pulse">
                  <span className="transition-all group-hover:translate-x-1 group-hover:hidden">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                  <span className="transition-all group-hover:translate-x-1 hidden group-hover:inline">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
            <h1 className="text-center text-4xl leading-[48px] md:text-5xl md:leading-[60px] font-medium text-slate-800 mx-auto max-w-lg">
              Learn to Code and Build Your Career
            </h1>
          </section>
          <CoursesCardGroup />
          <section className=" px-5 xl:px-0 py-20 relative bg-[url('https://cdn.hashnode.com/res/hashnode/image/upload/v1708535946035/820bff2b-6857-4a88-a1da-3da62c64bd93.png')]">
            {/* <div className="bg-slate-900 absolute w-full inset-0" /> */}
            <section className="w-full mx-auto max-w-6xl flex flex-col gap-10 relative z-30">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h3 className="text-slate-400 text-lg">Hi</h3>
                <span className="text-slate-300 text-xl">
                  I&apos;m Uncle-Big-Bay
                </span>
              </div>
              <section className="rounded overflow-hidden ring-2 ring-slate-800">
                <YTVideo embedURL="https://www.youtube.com/embed/JH77WsDH8yY" />
              </section>
            </section>
          </section>
          <section className="w-full mx-auto max-w-6xl px-5 md:px-0 py-[128px]">
            <SectionHeading
              heading={
                <>
                  What my <br className="md:hidden" />
                  <span className="relative text-slate-600 whitespace-nowrap">
                    Students Say
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute top-3/4 left-0 h-[0.6em] w-full fill-slate-500/60"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                  </span>
                </>
              }
              copy="Hear directly from our students about their experiences and how my
              courses have impacted their journey."
            />
            <Testimonials />
          </section>
          <section className="mt-10 flex flex-col gap-14 w-full mx-auto max-w-6xl px-5 md:px-0 py-4">
            <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
              <SectionHeading
                heading={
                  <>
                    You are in <br className="md:hidden" />
                    <span className="relative text-slate-600 whitespace-nowrap">
                      good company
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute top-3/4 left-0 h-[0.6em] w-full fill-slate-500/60"
                        preserveAspectRatio="none"
                      >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                      </svg>
                    </span>
                  </>
                }
                copy="Join thousands of aspiring developers on a journey to mastering
                web development in 2024."
              />
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
    </main>
  );
}
