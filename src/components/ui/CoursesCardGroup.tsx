import Link from 'next/link';
import { ArrowUpRight } from '../icons/ArrowUpRight';
import { Course, courses } from '@/lib/constants/courses';

export const CoursesCardGroup = () => {
  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap justify-center`}
    >
      {courses.map((course) => (
        <CourseLinkCard course={course} key={`course-list-${course.title}`} />
      ))}
    </section>
  );
};

type CourseLinkCardProps = {
  course: Course;
};

const CourseLinkCard = ({ course }: CourseLinkCardProps) => {
  const { title, copy, url, color, latest } = course;
  const comingSoon = !url;
  return (
    <>
      <style
        /* Normal Tailwind isn't working in production mode (test approaches locally with pnpm build; pnpm start) */
        dangerouslySetInnerHTML={{
          __html: `
            #course-card-for-${title}:hover{
              border-color: ${color}
            }
           `,
        }}
      />
      <Link
        href={url}
        className={`${comingSoon ? 'opacity-70 hover:opacity-100 focus:opacity-100' : ''} group border hover:border-[${color}] px-5 py-7 rounded-xl flex flex-col gap-3`}
        id={`course-card-for-${title}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`uppercase font-medium`} style={{ color: color }}>
              {title}
            </h2>
            {latest && (
              <span className="px-1 text-[12px] font-medium border border-blue-100 text-blue-500 bg-blue-100 rounded-full">
                New
              </span>
            )}
            {comingSoon && (
              <span className="px-1 text-[12px] font-medium border bg-slate-100 text-slate-600 rounded-full">
                Coming soon
              </span>
            )}
          </div>
          <span
            className={`hidden group-hover:inline`}
            style={{ color: color }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="text-slate-700 transition-all delay-100 group-hover:text-slate-800 text-sm">
          {copy}
        </p>
      </Link>
    </>
  );
};
