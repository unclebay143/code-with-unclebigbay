'use client';

import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Boxes } from '@/components/ui/background-boxes';
import * as Tabs from '@radix-ui/react-tabs';
import {
  ArrowLeft,
  Calendar,
  Hourglass,
  Linkedin,
  Medal,
  Share,
  Share2,
  Twitter,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const people = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
  },
  {
    id: 2,
    name: 'Robert Johnson',
    designation: 'Product Manager',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Jane Smith',
    designation: 'Data Scientist',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'UX Designer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Tyler Durden',
    designation: 'Soap Developer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  },
  {
    id: 6,
    name: 'Dora',
    designation: 'The Explorer',
    image:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
  },
];

const registered = true;
const isClosed = false;
const disableSubmitEntryBtn = isClosed;
const disableRegisterBtn = registered || isClosed;

const Page = () => {
  return (
    <WhiteArea border>
      <div className="flex items-center justify-between mb-5">
        <Button size="xs" appearance="secondary-slate">
          <Link
            href="/dashboard/hackathons"
            className="flex gap-1 items-center"
          >
            <ArrowLeft size={14} />
            <span>Explore more hackathons</span>
          </Link>
        </Button>
      </div>
      <section className="flex flex-col gap-3 pb-5">
        <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <section className="flex flex-col items-center gap-3 relative z-20">
            <h2 className="md:text-4xl text-xl text-white">May Codathon</h2>
            {/* <p className="text-center mt-2 text-neutral-300">
              Framer motion is the best animation library ngl
            </p> */}
            <span
              className={`${isClosed ? 'text-red-500' : 'text-blue-500'} text-sm font-bold flex items-center gap-1`}
            >
              <Calendar size={14} /> May 1st - 31st{' '}
              {isClosed ? '(closed)' : null}
            </span>
            <div>
              {registered ? (
                <Button
                  size="xs"
                  appearance="secondary-slate"
                  disabled={disableSubmitEntryBtn}
                >
                  Submit entry
                </Button>
              ) : (
                <Button
                  size="xs"
                  appearance="secondary-slate"
                  disabled={disableRegisterBtn}
                >
                  Register now
                </Button>
              )}
            </div>
          </section>
        </div>

        <section className="flex flex-col gap-8 mt-5">
          <section className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-700 text-xl">
              About Codathon
            </h3>
            <p className="text-slate-500">
              Welcome aspiring developers! Are you ready to embark on a
              transformative journey that merges your coding skills with global
              impact? Here&apos;s an incredible opportunity for you: join us in
              crafting innovative solutions to tackle one of the United
              Nations&pos; 17 Sustainable Development Goals (SDGs) using the
              power of Artificial Intelligence (AI). This is more than just a
              project; it&apos;s a chance to make a tangible difference while
              honing your skills in AI development. Let&apos;s collaborate to
              create meaningful solutions that contribute to a brighter, more
              sustainable future for all. Embrace this opportunity to unleash
              your creativity, technical expertise, and passion for positive
              change!
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-700 text-xl">
              What to build
            </h3>
            <p className="text-slate-500">
              Build your multimodal app that features at least 2 or more modes
              from the categories of image, video/motion, voice/audio, or text
              using Azure AI. Leverage Microsoft’s Responsible AI tools and/or
              principles. Bonus: Use Visual Studio Code Extensions
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-700 text-xl">Judges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8">
              <div className="flex gap-3 items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg"
                    alt=""
                    fill
                  />
                </div>
                <section className="">
                  <p className="text-lg font-semibold text-black">
                    Ayodele Samuel Adebayo
                  </p>
                  <p className="text-slate-500">Founder @CWUBB</p>
                </section>
              </div>
              <div className="flex gap-3 items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/team/3/team-avatar-1.jpg"
                    alt=""
                    fill
                  />
                </div>
                <section className="">
                  <p className="text-lg font-semibold text-black">
                    Jenny Wilson
                  </p>
                  <p className="text-slate-500">Software engineer @twitter</p>
                </section>
              </div>
              <div className="flex gap-3 items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/team/3/team-avatar-2.jpg"
                    alt=""
                    fill
                  />
                </div>
                <section className="">
                  <p className="text-lg font-semibold text-black">
                    Shaydee Coder
                  </p>
                  <p className="text-slate-500">Freelance software engineer</p>
                </section>
              </div>
              <div className="flex gap-3 items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/team/3/team-avatar-3.jpg"
                    alt=""
                    fill
                  />
                </div>
                <section className="">
                  <p className="text-lg font-semibold text-black">
                    Idris Olubisi
                  </p>
                  <p className="text-slate-500">Software engineer @axelar</p>
                </section>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-700 text-xl">
              Judging criteria
            </h3>
            <ul className="list-decimal list-inside ml-2 text-slate-600">
              <li className="mb-3">
                <div className="inline">
                  <span className="text-slate-600 font-semibold">
                    Technological Implementation
                  </span>
                  <p className="ml-5 mt-2 text-slate-500">
                    Does the project demonstrate quality software development?
                    Did the developers go above and beyond by using Azure AI
                    features?
                  </p>
                </div>
              </li>
              <li className="mb-3">
                <div className="inline">
                  <span className="text-slate-600 font-semibold">
                    Potential Impact
                  </span>
                  <p className="ml-5 mt-2 text-slate-500">
                    How big of an impact could the project have on the AI
                    community? How big of an impact could it have beyond the
                    target community?
                  </p>
                </div>
              </li>
              <li className="mb-3">
                <div className="inline">
                  <span className="text-slate-600 font-semibold">
                    Quality of the Idea
                  </span>
                  <p className="ml-5 mt-2 text-slate-500">
                    How creative and unique is the project? Does the concept
                    exist already? If so, how much does the project improve on
                    it?
                  </p>
                </div>
              </li>
              <li className="mb-3">
                <div className="inline">
                  <span className="text-slate-600 font-semibold">
                    Multimodal Functionality
                  </span>
                  <p className="ml-5 mt-2 text-slate-500">
                    Does the project make interesting use of the required
                    multimodal functionality? How well do 2 or more multimodal
                    features (image, video/motion, voice/audio, text) add value
                    to the overall project?q
                  </p>
                </div>
              </li>
              <li className="mb-3">
                <div className="inline">
                  <span className="text-slate-600 font-semibold">
                    Bonus VS Code Extensions
                  </span>
                  <p className="ml-5 mt-2 text-slate-500">
                    Does the project use VS Code Extensions? How well do they
                    add value to the overall project?
                  </p>
                </div>
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-2">
            <div className="flex items-center text-slate-700 gap-1">
              <Medal size={22} />
              <h3 className="font-semibold  text-xl">Prizes</h3>
            </div>
            <div className="flex flex-wrap gap-10 ml-2">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-yellow-600">1st Place</p>
                <ul className="list-disc list-inside ml-1 flex flex-col gap-1 text-sm text-slate-500 font-medium">
                  <li>#50, 000</li>
                  <li>Gold badge</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-amber-600">2nd Place</p>
                <ul className="list-disc list-inside ml-1 flex flex-col gap-1 text-sm text-slate-500 font-medium">
                  <li>#25, 000</li>
                  <li>Silver badge</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-orange-500/80">3rd Place</p>
                <ul className="list-disc list-inside ml-1 flex flex-col gap-1 text-sm text-slate-500 font-medium">
                  <li>#10, 000</li>
                  <li>Bronze badge</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-slate-600">
                  Valid Participants
                </p>
                <ul className="list-disc list-inside ml-1 flex flex-col gap-1 text-sm text-slate-500 font-medium">
                  <li>Participant badge</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-700 text-xl">
              Participants
            </h3>
            <section className="flex flex-row flex-wrap gap-y-3">
              <AnimatedTooltip items={people} />
            </section>
          </section>
          {/* <section className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16"> */}
          <section className="py-10 bg-gradient-to-r from-slate-600 to-slate-900 sm:py-16 rounded-xl">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="text-center flex flex-col gap-4 items-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <h2 className="text-3xl font-bold text-white">
                  Participate in the Codathon Hackathon!
                </h2>
                <div className="whitespace-nowrap">
                  <Button appearance="secondary-slate">Register now</Button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <a
        href=""
        target="_blank"
        className="hover:text-slate-600 text-sm text-center text-slate-500 flex items-center gap-1 justify-center"
      >
        Share on Twitter <Twitter size={14} />
      </a>
    </WhiteArea>
  );
};

export default Page;
