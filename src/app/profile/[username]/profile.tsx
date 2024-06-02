'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import {
  IconButton,
  BrandXTwitter,
  Facebook,
  BrandYoutube,
  Instagram,
  Linkedin,
  Github,
  Button,
  MapPin,
  CalendarEvent,
  ArrowExternalLink01,
} from '@hashnode/matrix-ui';
import { formatDate } from '@/utils/date';
import { Countries, Student } from '@/utils/types';

type ProfileProps = {
  student: Student;
  canUpdateProfile: boolean;
};

export const Profile = ({ student, canUpdateProfile }: ProfileProps) => {
  const socials = student?.socials || {};
  const totalPoint = student?.totalScore;

  const mapFollowToSocial: {
    [key: string]: { url: string; Icon: React.FC<any>; label: string };
  } = {
    linkedin: {
      url: socials.linkedin,
      Icon: Linkedin,
      label: 'Connect',
    },
    x: { url: socials.x, Icon: BrandXTwitter, label: 'Follow' },
    github: { url: socials.github, Icon: Github, label: 'Connect' },
    youtube: { url: socials.youtube, Icon: BrandYoutube, label: 'Follow' },
    facebook: {
      url: socials.facebook,
      Icon: Facebook,
      label: 'Follow',
    },
    instagram: {
      url: socials.instagram,
      Icon: Instagram,
      label: 'Follow',
    },
  };
  const linkedin = socials.linkedin ? 'linkedin' : '';
  const x = socials.x ? 'x' : '';
  const github = socials.github ? 'github' : '';
  const youtube = socials.youtube ? 'youtube' : '';
  const facebook = socials.facebook ? 'facebook' : '';
  const instagram = socials.instagram ? 'instagram' : '';

  const networkingMedium =
    mapFollowToSocial[
      linkedin || x || github || youtube || facebook || instagram
    ];

  const renderSocialIcons = () => {
    return Object.keys(mapFollowToSocial).map((key) => {
      const { url, Icon } = mapFollowToSocial[key];

      if (url) {
        return (
          <a href={url} key={key} target="_blank">
            <IconButton Icon={Icon} />
          </a>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <WhiteArea>
        <section className="flex flex-col items-center gap-5 justify-between sm:flex-row sm:items-start">
          <div className="flex flex-col text-center justify-center sm:flex-row sm:text-left item-center gap-6">
            {student?.photo ? (
              <Image
                src={student?.photo}
                alt={student?.fullName || ''}
                width={120}
                height={60}
                className="rounded-full mx-auto"
              />
            ) : null}
            <div className="flex justify-center flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-3xl capitalize">
                  {student?.fullName || student?.username}
                </h2>
                <p className="text-slate-600 capitalize">
                  {student?.stack} Developer
                </p>
              </div>
              {/* <Button size="xs">Hire me</Button> */}
              {networkingMedium && (
                <div className="flex justify-center items-start sm:justify-start">
                  <Button size="xs" appearance="primary-slate" asChild>
                    <a
                      href={networkingMedium.url}
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-1"
                    >
                      <span>{networkingMedium.label}</span>
                      <networkingMedium.Icon size="sm" iconSolid />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-end">
            {!student.isAnonymous && totalPoint && (
              <h3 className="font-medium text-slate-600">
                <span className="font-semibold">Total Points: </span>
                <span>{totalPoint}</span>
              </h3>
            )}
            <div className="hidden sm:block">
              {canUpdateProfile && (
                <Button size="xs" appearance="secondary-slate" asChild>
                  <Link href="/dashboard/settings">Update</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </WhiteArea>
      {/* Socials and location */}
      <WhiteArea border>
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          {networkingMedium && (
            <div className="flex gap-3 grow flex-wrap">
              {renderSocialIcons()}
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row justify-between grow">
            {student.location && (
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin size="sm" />
                <h3>{student.location}</h3>
              </div>
            )}
            <div className="text-slate-600 flex items-center gap-1">
              <CalendarEvent size="sm" />
              <span>Joined {formatDate(student.createdAt)}</span>
            </div>
          </div>
        </div>
      </WhiteArea>
      {/* Bio */}
      {student?.bio && (
        <WhiteArea border>
          <div className="flex flex-col">
            <h1 className="font-semibold text-slate-700 mb-3">About me</h1>
            <p>{student?.bio}</p>
          </div>
        </WhiteArea>
      )}

      {/* Links */}
      {(socials.blog || socials.portfolio) && (
        <WhiteArea border>
          <h2 className="font-semibold text-slate-700 mb-3">Links</h2>
          <div className="flex flex-col gap-6">
            {socials.blog && (
              <div>
                <h2 className="font-medium">Blog</h2>
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener"
                  href={socials.blog}
                >
                  <div className="flex items-center gap-1">
                    <div>
                      <ArrowExternalLink01 size="sm" />
                    </div>
                    <p className="break-words truncate">{socials.blog}</p>
                  </div>
                </a>
              </div>
            )}
            {socials.portfolio && (
              <div>
                <h2 className="font-medium">Portfolio</h2>
                <a
                  className="text-blue-500 break-words hover:underline"
                  target="_blank"
                  rel="noopener"
                  href={socials.portfolio}
                >
                  <div className="flex items-center gap-1">
                    <div>
                      <ArrowExternalLink01 size="sm" />
                    </div>
                    <p className="break-words truncate">{socials.portfolio}</p>
                  </div>
                </a>
              </div>
            )}
          </div>
        </WhiteArea>
      )}
      <WhiteArea border twClass="hidden">
        <h1 className="font-semibold text-slate-700">Badges</h1>
        <div className="flex flex-col items-center gap-8 text-slate-700 sm:items-start mt-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="rounded-full w-20 h-20 relative overflow-hidden">
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1713077307741/da39704c-1c4d-43de-b38f-b3c114f7b327.png"
                alt="badge"
                fill
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-md font-medium">Gold hackathon badge</h3>
              <p className="text-slate-500">
                Earn from participating in the January hackathon
              </p>
              <p className="text-xs text-slate-400">
                Achieved on Jan 30, 2024.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="rounded-full w-20 h-20 relative overflow-hidden">
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1713080566478/33158274-ce0d-4981-94f1-0011828515d9.png"
                alt="badge"
                fill
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-md font-medium">Silver hackathon badge</h3>
              <p className="text-slate-500">
                Earn from participating in the January hackathon
              </p>
              <p className="text-xs text-slate-400">
                Achieved on Jan 30, 2024.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="rounded-full w-20 h-20 relative overflow-hidden">
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1713077307741/da39704c-1c4d-43de-b38f-b3c114f7b327.png"
                alt="badge"
                fill
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-md font-medium">Bronze hackathon badge</h3>
              <p className="text-slate-500">
                Earn from participating in the January hackathon
              </p>
              <p className="text-xs text-slate-400">
                Achieved on Jan 30, 2024.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="rounded-full w-20 h-20 relative overflow-hidden">
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1713077307741/da39704c-1c4d-43de-b38f-b3c114f7b327.png"
                alt="badge"
                fill
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-md font-medium">
                Hackathon Participation badge
              </h3>
              <p className="text-slate-500">
                Earn from participating in the January hackathon
              </p>
              <p className="text-xs text-slate-400">
                Achieved on Jan 30, 2024.
              </p>
            </div>
          </div>
        </div>
      </WhiteArea>
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
  );
};
