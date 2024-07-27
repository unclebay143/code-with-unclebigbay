'use client';

import Link from 'next/link';
import {
  ArrowExternalLink01,
  Avatar,
  Badge,
  IconButton,
} from '@hashnode/matrix-ui';
import { YTVideo } from '@/components/atoms/YTVideo';
import {
  HackathonProject,
  HackathonParticipant,
  HackathonType,
} from '@/utils/types';
import Image from 'next/image';
import { DEFAULT_PROFILE_PHOTO } from '@/utils';

interface Props {
  _id: string;
  name: string;
  description: string;
  slug: string;
  project: HackathonProject;
  student: HackathonParticipant;
  hackathon: HackathonType;
}
export default function HackathonProjectCard(props: Props) {
  const { _id, project, hackathon, student } = props;
  const { slug, hashTag } = hackathon;

  return (
    <Link
      key={_id}
      href={`/dashboard/hackathons/${slug}/submissions/${_id}`}
      className="flex flex-col border rounded-xl overflow-hidden transition-colors duration-200 ease-in-out hover:border-slate-300"
    >
      <div className="relative">
        <YTVideo ytVideoId={project?.demoUrl ?? ''} removeRounded />
        <div className="absolute z-10 inset-0 w-full h-full" />
      </div>

      <div className="flex flex-col flex-1 justify-between gap-5 p-4 pb-[14px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-700 text-md line-clamp-2 font-medium">
            {project?.name}
          </h1>
          <p
            className="text-slate-500 text-sm line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: project?.description,
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <div className="flex items-center gap-0.5">
              <p>by</p>
              <Avatar size="xs">
                <Image
                  className="object-cover rounded-full h-5 w-5"
                  src={student?.photo || DEFAULT_PROFILE_PHOTO}
                  alt="participant"
                  width={24}
                  height={24}
                />
              </Avatar>
              <p className="truncate text-xs max-w-[200px]">
                {student?.fullName || student?.username}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <Badge theme="slate" size="xs">
              <span className="truncate max-w-[150px] xl:max-w-[200px]">
                {hashTag}
              </span>
            </Badge>
            <IconButton Icon={ArrowExternalLink01} size="xs" />
          </div>
        </div>
      </div>
    </Link>
  );
}
