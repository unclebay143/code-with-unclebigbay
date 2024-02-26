import React from 'react';
import { Material } from '../../../types/course';
import { PlayCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CourseCardProps = {
  material: Material;
  layout?: 'grid' | 'card';
};

export const CourseCard = ({ layout = 'grid', material }: CourseCardProps) => {
  const { type, title, description, coverImageURL } = material;

  const mapTypeToIcon: { [key: string]: LucideIcon } = {
    video: PlayCircle,
  };
  const Icon = mapTypeToIcon[type];
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
            30 mins
          </span>
        </div>
      )}

      {layout === 'grid' && (
        <div className="border rounded-lg overflow-hidden transition-colors duration-200 ease-in-out hover:border-slate-300">
          <div className="h-[196px] relative">
            <Link href="" className="h-full w-full inline-block relative">
              <Image
                src={coverImageURL}
                alt=""
                className="w-full h-full"
                fill
              />
            </Link>
          </div>
          <section className="p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Link
                href=""
                className="text-gray-700 font-medium hover:text-slate-800 text-lg line-clamp-2"
              >
                {title}
              </Link>
              <span className="p-1 px-1.5 rounded-full bg-slate-100 text-xs font-medium">
                45m
              </span>
            </div>
            <p className="text-slate-500">{description}</p>
          </section>
        </div>
      )}
    </>
  );
};
