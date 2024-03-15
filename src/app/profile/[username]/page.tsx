import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';
import Image from 'next/image';
import { baseURL } from '../../../../frontend.config';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/atoms/Navbar';
import { SectionWrapper } from '@/components/molecules/home';
import { IconButton } from '@/components/atoms/IconButton';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Footer } from '@/components/atoms/Footer';
import { Student } from '@/utils/types';

async function getCurrentStudent(username: string) {
  try {
    const url = `${baseURL}/api/students/${username}`;
    const result = await fetch(url, {
      cache: 'force-cache',
    });

    if (!result.ok) {
      console.log('not found');
      return notFound();
    }
    return result.json();
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Profile = async ({ params }: { params: { username: string } }) => {
  const { student } =
    ((await getCurrentStudent(params?.username)) as { student: Student }) || {};

  console.log(student.socials.portfolio);

  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <SectionWrapper>
        <div>
          <div className="flex flex-col gap-6">
            <WhiteArea border>
              <section className="flex justify-between items-center">
                <div className="flex item-center gap-2">
                  {student?.photo ? (
                    <Image
                      src={student?.photo}
                      alt={student?.fullName || ''}
                      width={120}
                      height={60}
                      className="rounded-full"
                    />
                  ) : null}
                  <div className="flex justify-center flex-col gap-4">
                    <div>
                      <h2 className="font-semibold text-lg capitalize">
                        {student?.fullName}
                      </h2>
                      <p className="text-slate-600 text-sm capitalize">
                        {student?.stack} Developer
                      </p>
                    </div>

                    <div>
                      {/* <Button size="xs">Hire me</Button> */}
                      <Button size="xs">
                        <Link
                          href={student.socials.x}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-1"
                        >
                          <span>Follow</span>
                          <Twitter size="12" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-end">
                  <h3 className="font-medium">
                    <span className="text-slate-600">Total Point : </span> 1890
                  </h3>
                  <Button size="xs" appearance="secondary-slate" asChild>
                    <Link href="/dashboard/settings">Update</Link>
                  </Button>
                </div>
              </section>
            </WhiteArea>

            <WhiteArea border>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <a href="">
                    <IconButton Icon={Twitter} />
                  </a>
                  <a href="">
                    <IconButton Icon={Linkedin} />
                  </a>
                  <a href="">
                    <IconButton Icon={Youtube} />
                  </a>
                  <a href="">
                    <IconButton Icon={Github} />
                  </a>
                </div>

                <h3 className="text-slate-600">FCT, Abuja, Nigeria.</h3>

                <h3>
                  <span className="text-slate-600">Joined March, </span>
                  2024
                </h3>
              </div>
            </WhiteArea>
            {/* Bio */}
            <WhiteArea border>
              <div className="flex flex-col gap-3">
                <h1 className="font-bold">About me</h1>
                <p>{student?.bio}</p>
              </div>
            </WhiteArea>

            {/* Blogs */}
            <WhiteArea border>
              <h2 className="font-bold mb-3">Visit my blog at</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  {student?.photo ? (
                    <Image
                      src={student?.photo}
                      alt={student?.fullName}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  ) : null}
                  <div>
                    <h2 className="font-mono font-semibold">My Blog</h2>
                    <a
                      className="opacity-80 text-blue-400 hover:underline"
                      href={student.socials.blog}
                    >
                      {student.socials.blog}
                    </a>
                  </div>
                </div>
                {student.socials.portfolio && (
                  <div>
                    <h2 className="font-mono font-semibold">Portfolio</h2>
                    <a
                      className="opacity-80 text-blue-400 hover:underline"
                      href={student.socials.portfolio}
                    >
                      {student.socials.portfolio}
                    </a>
                  </div>
                )}
              </div>
            </WhiteArea>

            <WhiteArea border>
              <h2 className="font-bold mb-3">Checkout my projects</h2>
              <section className="flex flex-col gap-8">
                <WhiteArea border>
                  <div className="font-medium">
                    <p>
                      <span className="text-slate-600">Tittle</span> : Todoist
                    </p>
                    <p>
                      <span className="text-slate-600">Description</span> :
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquam aliquid quaerat itaque
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-600 font-medium">Demo : </span>
                    <a
                      className="opacity-80 text-blue-400 hover:underline"
                      href="https://todoistwebapp.vercel.app/"
                    >
                      https://todoistwebapp.vercel.app/
                    </a>
                  </div>
                </WhiteArea>
                <WhiteArea border>
                  <div className="font-medium">
                    <p>
                      <span className="text-slate-600">Tittle</span> : Todoist
                    </p>
                    <p>
                      <span className="text-slate-600">Description</span> :
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquam aliquid quaerat itaque
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-600 font-medium">Demo : </span>
                    <a
                      className="opacity-80 text-blue-400 hover:underline"
                      href="https://todoistwebapp.vercel.app/"
                    >
                      https://todoistwebapp.vercel.app/
                    </a>
                  </div>
                </WhiteArea>
                <WhiteArea border>
                  <div className="font-medium">
                    <p>
                      <span className="text-slate-600">Tittle</span> : Todoist
                    </p>
                    <p>
                      <span className="text-slate-600">Description</span> :
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquam aliquid quaerat itaque
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-600 font-medium">Demo : </span>
                    <a
                      className="opacity-80 text-blue-400 hover:underline"
                      href="https://todoistwebapp.vercel.app/"
                    >
                      https://todoistwebapp.vercel.app/
                    </a>
                  </div>
                </WhiteArea>
                <WhiteArea border>
                  <div className="font-medium">
                    <p>
                      <span className="text-slate-600">Tittle</span> : Todoist
                    </p>
                    <p>
                      <span className="text-slate-600">Description</span> :
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquam aliquid quaerat itaque
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-600 font-medium">Demo : </span>
                    <a
                      className="opacity-80 text-blue-400 hover:underline"
                      href="https://todoistwebapp.vercel.app/"
                    >
                      https://todoistwebapp.vercel.app/
                    </a>
                  </div>
                </WhiteArea>
              </section>
            </WhiteArea>
          </div>
        </div>
        <Footer />
      </SectionWrapper>
    </div>
  );
};

export default Profile;
