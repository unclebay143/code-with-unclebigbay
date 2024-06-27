'use client';

import { allHackathons } from '@/utils/consts/all-hackathons';
import { useState } from 'react';
import Link from 'next/link';
import './style.css';
import {
  ArrowExternalLink01,
  ArrowLeft,
  Avatar,
  Badge,
  Button,
  IconButton,
} from '@hashnode/matrix-ui';
import Image from 'next/image';
import { YTVideo } from '@/components/atoms/YTVideo';
import { DashboardSubheading } from '../dashboard-subheading';

interface HackathonType {
  id: number;
  name: string;
  title: string;
  description: string;
  coverImage: string;
  profileImage: string;
}
export default function AllHackathons() {
  const [hackathons, setHackathons] = useState<HackathonType[]>(allHackathons);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-4 justify-between md:flex-row-reverse md:items-center">
        <Button
          size="xs"
          appearance="secondary-slate"
          startIcon={ArrowLeft}
          asChild
        >
          <Link href="/dashboard/courses">Back to hackathon</Link>
        </Button>
        <DashboardSubheading title="Project Submissions for 'Build for Business Hackathon'" />
      </div>
      <div className="grid grid-cols-3 gap-4 justify-start">
        {hackathons && hackathons.length > 0 ? (
          hackathons.map(
            ({ id, name, title, description, coverImage, profileImage }) => (
              <Link
                key={id}
                href={`/dashboard/hackathons/hackathon-name/submissions/${id}`}
                className="border rounded-xl overflow-hidden transition-colors duration-200 ease-in-out hover:border-slate-300"
              >
                <div className="relative">
                  <YTVideo ytVideoId="4wblm-X0rEc" removeRounded />
                  <div className="absolute z-10 inset-0 w-full h-full" />
                </div>
                <div className="flex flex-col gap-5 p-4 pb-[14px]">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-gray-700 text-md truncate-two-lines font-medium">
                      {title}
                    </h1>
                    <p className="text-slate-500 text-sm truncate-three-lines ">
                      {description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-slate-500 text-xs">
                      <p>by</p>&nbsp;
                      <p className="truncate max-w-[200px]">{name}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <Badge theme="slate" size="xs">
                        <span className="truncate max-w-[150px] xl:max-w-[200px]">
                          Build for Business Hackathon
                        </span>
                      </Badge>
                      <IconButton Icon={ArrowExternalLink01} size="xs" />
                    </div>
                  </div>
                </div>
              </Link>
            ),
          )
        ) : (
          <div className="text-xl text-center text-slate-600">
            Hello, Our first hackathon will kick off soon...
          </div>
        )}
      </div>
    </section>
  );
}
