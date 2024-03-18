import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Twitter,
  Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/atoms/Button';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { baseURL } from '../../../../frontend.config';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/atoms/Navbar';
import { SectionWrapper } from '@/components/molecules/home';
import { IconButton } from '@/components/atoms/IconButton';
import { Footer } from '@/components/atoms/Footer';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Student } from '@/utils/types';

async function getCurrentStudent(username: string) {
  try {
    const session = await getServerSessionWithAuthOptions();
    const url = `${baseURL}/api/students/${username}`;
    const result = await fetch(url, {
      cache: 'no-cache',
    });
    const studentRes = await result.json();
    const canUpdateProfile = session?.user.email === studentRes.student.email;

    if (!result.ok) return undefined;

    return { studentRes, canUpdateProfile };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Profile = async ({ params }: { params: { username: string } }) => {
  const data = await getCurrentStudent(params?.username);
  if (!data) notFound();
  const { studentRes, canUpdateProfile } = data || {};
  const { student } = studentRes as { student: Student };

  const mapFollowToSocial: {
    [key: string]: { url: string; Icon: LucideIcon; label: string };
  } = {
    linkedin: {
      url: student.socials.linkedin,
      Icon: Linkedin,
      label: 'Connect',
    },
    x: { url: student.socials.x, Icon: Twitter, label: 'Follow' },
    github: { url: student.socials.github, Icon: Github, label: 'Connect' },
    youtube: { url: student.socials.youtube, Icon: Youtube, label: 'Follow' },
    facebook: {
      url: student.socials.facebook,
      Icon: Facebook,
      label: 'Follow',
    },
    instagram: {
      url: student.socials.instagram,
      Icon: Instagram,
      label: 'Follow',
    },
  };
  const linkedin = student.socials.linkedin ? 'linkedin' : '';
  const x = student.socials.x ? 'x' : '';
  const networkingMedium = mapFollowToSocial[linkedin || x];

  const renderSocialIcons = () => {
    return Object.keys(mapFollowToSocial).map((key) => {
      const { url, Icon } = mapFollowToSocial[key];

      if (student.socials) {
        return (
          <a href={url} key={key} target="_blank" rel="noopener noreferrer">
            <IconButton Icon={Icon} />
          </a>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <SectionWrapper>
        <WhiteArea border>
          <div className="max-w-4xl mx-auto pt-5 pb-10">
            <div className="flex flex-col gap-6">
              <WhiteArea>
                <section className="flex flex-col items-start gap-5 justify-between md:flex-row md:items-center">
                  <div className="flex flex-col md:flex-row item-center gap-6">
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
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-3xl capitalize">
                          {student?.fullName}
                        </h2>
                        <p className="text-slate-600 capitalize">
                          {student?.stack} Developer
                        </p>
                      </div>
                      {/* <Button size="xs">Hire me</Button> */}
                      {networkingMedium && (
                        <div className="flex items-start">
                          <Button size="xs" asChild>
                            <a
                              href={networkingMedium.url}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center gap-1"
                            >
                              <span>{networkingMedium.label}</span>
                              <networkingMedium.Icon size="12" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-end">
                    {!student.isAnonymous && (
                      <h3 className="font-medium">
                        <span className="text-slate-600">Total Points: </span>{' '}
                        1890
                      </h3>
                    )}
                    {canUpdateProfile && (
                      <Button size="xs" appearance="secondary-slate" asChild>
                        <Link href="/dashboard/settings">Update</Link>
                      </Button>
                    )}
                  </div>
                </section>
              </WhiteArea>
              {/* Socials and location */}
              <WhiteArea border>
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div className="flex gap-3 grow">{renderSocialIcons()}</div>
                  <div className="flex flex-col gap-3 sm:flex-row justify-between grow">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin size={16} />
                      <h3>{student.location}</h3>
                    </div>

                    <span className="text-slate-600">
                      Joined{' '}
                      {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(student.createdAt!))}
                    </span>
                  </div>
                </div>
              </WhiteArea>
              {/* Bio */}
              <WhiteArea border>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-slate-700 mb-3">
                    About me
                  </h1>
                  <p>{student?.bio}</p>
                </div>
              </WhiteArea>

              {/* Links */}
              {(student.socials.blog || student.socials.portfolio) && (
                <WhiteArea border>
                  <h2 className="font-semibold text-slate-700 mb-3">Links</h2>
                  <div className="flex flex-col gap-6">
                    {student.socials.blog && (
                      <div>
                        <h2 className="font-medium">Blog</h2>
                        <a
                          className="text-blue-500 hover:underline flex items-center gap-1"
                          target="_blank"
                          rel="noopener"
                          href={student.socials.blog}
                        >
                          <ExternalLink size={16} />
                          {student.socials.blog}
                        </a>
                      </div>
                    )}
                    {student.socials.portfolio && (
                      <div>
                        <h2 className="font-medium">Portfolio</h2>
                        <a
                          className="text-blue-500 hover:underline flex items-center gap-1"
                          target="_blank"
                          rel="noopener"
                          href={student.socials.portfolio}
                        >
                          <ExternalLink size={16} />
                          {student.socials.portfolio}
                        </a>
                      </div>
                    )}
                  </div>
                </WhiteArea>
              )}
              {/* Enable when feature is available */}
              {/* <WhiteArea border>
              <h2 className="font-semibold text-slate-700 mb-3">Projects</h2>
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
                      className="text-blue-400 hover:underline"
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
                      className="text-blue-400 hover:underline"
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
                      className="text-blue-400 hover:underline"
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
                      className="text-blue-400 hover:underline"
                      href="https://todoistwebapp.vercel.app/"
                    >
                      https://todoistwebapp.vercel.app/
                    </a>
                  </div>
                </WhiteArea>
              </section>
            </WhiteArea> */}
            </div>
          </div>
        </WhiteArea>
        <Footer />
      </SectionWrapper>
    </div>
  );
};

export default Profile;
