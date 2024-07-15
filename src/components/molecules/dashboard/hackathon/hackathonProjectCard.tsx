'use client';

import Link from 'next/link';
import { ArrowExternalLink01, Badge, IconButton } from '@hashnode/matrix-ui';
import { YTVideo } from '@/components/atoms/YTVideo';
import { HackathonProjectDetails, HackathonStudentDetails } from '@/utils/types';

interface Props {
  _id: string;
  name: string;
  description: string;
  slug: string;
  project: HackathonProjectDetails;
  student: HackathonStudentDetails;
}
export default function HackathonProjectCard({
  _id,
  project,
  student,
  slug,
}: Props) {
  return (
    <Link
      key={_id}
      href={`/dashboard/hackathons/${slug}/submissions/${_id}`}
      className="border rounded-xl overflow-hidden transition-colors duration-200 ease-in-out hover:border-slate-300"
    >
      <div className="relative">
        <YTVideo ytVideoId={project.demoUrl} removeRounded />
        <div className="absolute z-10 inset-0 w-full h-full" />
      </div>
      <div className="flex flex-col gap-5 p-4 pb-[14px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-700 text-md line-clamp-2 font-medium">
            {project.name}
          </h1>
          <p className="text-slate-500 text-sm line-clamp-3 ">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-slate-500 text-xs">
            <p>by</p>&nbsp;
            <p className="truncate max-w-[200px]">{student.fullName}</p>
          </div>
          <div className="flex items-end justify-between">
            <Badge theme="slate" size="xs">
              <span className="truncate max-w-[150px] xl:max-w-[200px]">
                {slug}
              </span>
            </Badge>
            <IconButton Icon={ArrowExternalLink01} size="xs" />
          </div>
        </div>
      </div>
    </Link>
  );
}
