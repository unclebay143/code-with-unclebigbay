import React from 'react';
import { Course } from '@/utils/types';
import { PlayCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatTime } from '@/utils';
import { Badge } from '@hashnode/matrix-ui';

type CourseCardProps = {
  course: Course;
  layout?: 'grid' | 'card';
};

export const CourseCard = ({ layout = 'grid', course }: CourseCardProps) => {
  const {
    _id,
    type,
    slug,
    title,
    brief,
    coverImageUrl,
    viewTime,
    isEnrolled,
    tags,
  } = course;

  const mapTypeToIcon: { [key: string]: LucideIcon } = {
    video: PlayCircle,
  };
  const Icon = mapTypeToIcon[type!];
  const courseLink = `/dashboard/courses/${slug}`;

  return (
    <>
      {layout === 'card' && (
        <div className="flex items-center gap-2 justify-between border p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">
              <Icon size={16} />
            </span>
            <h3 className="text-slate-600 text-sm truncate max-w-[300px] lg:max-w-[180px]">
              {title}
            </h3>
          </div>
          <span className="p-1 px-1.5 rounded-full bg-slate-100 text-xs font-medium">
            {formatTime(viewTime)}
          </span>
        </div>
      )}

      {layout === 'grid' && (
        <Link
          href={courseLink}
          className="border rounded-xl overflow-hidden transition-colors duration-200 ease-in-out hover:border-slate-300"
          prefetch={true}
        >
          <div className="h-[180px] relative">
            <div className="h-full w-full inline-block relative">
              <Image
                src={coverImageUrl}
                alt=""
                className="w-full h-full"
                priority
                fill
              />
            </div>
          </div>
          <section className="p-5 flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 items-start justify-between">
                <div>
                  <h3
                    title={title}
                    className="inline text-gray-700 font-medium hover:text-slate-800 text-lg"
                  >
                    {title}
                  </h3>{' '}
                  {tags && tags.length > 0
                    ? tags
                        .map((tag) => tag?.name?.toLowerCase())
                        .includes('css') && (
                        <span className="px-1 text-[12px] font-medium border border-green-100 text-green-500 bg-green-100 rounded-full">
                          New
                        </span>
                      )
                    : null}
                </div>
                {viewTime ? (
                  <span className="py-1 px-2 whitespace-nowrap rounded-full bg-slate-100 text-xs font-semibold">
                    {formatTime(viewTime)}
                  </span>
                ) : null}
              </div>
              <p
                className="text-slate-500 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: brief }}
              />
            </div>

            {isEnrolled && (
              <span className="w-fit text-xs rounded px-3 py-1 bg-slate-100 text-slate-600 font-medium">
                Enrolled
              </span>
            )}
          </section>
        </Link>
      )}
    </>
  );
};

export const CourseCardSkeleton = () => {
  return (
    <div className="animate-pulse border rounded-xl overflow-hidden transition-colors duration-200 ease-in-out hover:border-slate-300">
      <div className="h-[180px] relative">
        <div className="h-full w-full bg-slate-50 inline-block relative"></div>
      </div>
      <section className="h-full  p-6 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-start justify-between">
            <div className="h-5 w-full rounded-full text-gray-700 font-medium hover:text-slate-800 text-lg line-clamp-2 bg-slate-50" />
            <div className="h-5 w-10 rounded-full bg-slate-50" />
          </div>
          <p className="bg-slate-50 w-1/2 h-5 rounded-full" />
          <p className="bg-slate-50 w-full h-5 rounded-full" />
          {/* <p className="bg-slate-50 w-full h-5 rounded-full" />
          <p className="bg-slate-50 w-full h-5 rounded-full" /> */}
          {/* <p className="bg-slate-50 w-1/2 h-5 rounded-full" /> */}
          <p className="bg-slate-50 w-full h-5 rounded-full" />
        </div>
      </section>
    </div>
  );
};
