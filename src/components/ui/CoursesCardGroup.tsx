import Link from 'next/link';
import { ArrowUpRight } from '../icons/ArrowUpRight';

type Course = {
  title: string;
  copy: string;
  url: string;
  tailwindColor: { borderHoverColor: string; titleColor: string };
};

type Courses = Course[];

const courses: Courses = [
  {
    title: 'HTML',
    copy: 'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.',
    url: '/courses/html',
    tailwindColor: {
      borderHoverColor: 'hover:border-blue-500',
      titleColor: 'text-blue-500',
    },
  },
  {
    title: 'CSS',
    copy: 'Dive into CSS and learn how to style your web pages to make them visually appealing.',
    url: '/courses/css',
    tailwindColor: {
      borderHoverColor: 'hover:border-green-500',
      titleColor: 'text-green-500',
    },
  },
  {
    title: 'JavaScript',
    copy: 'Master JavaScript basics and add interactivity to your websites with dynamic scripting.',
    url: '',
    tailwindColor: {
      borderHoverColor: 'hover:border-yellow-500',
      titleColor: 'text-yellow-500',
    },
  },
  {
    title: 'Tailwind CSS',
    copy: 'Master the modern utility-first CSS framework and streamline your web development workflow.',
    url: '',
    tailwindColor: {
      borderHoverColor: 'hover:border-teal-500',
      titleColor: 'text-teal-500',
    },
  },
  {
    title: 'React',
    copy: 'Discover React, a popular JavaScript library for building user interfaces, and create dynamic web applications.',
    url: '',
    tailwindColor: {
      borderHoverColor: 'hover:border-indigo-500',
      titleColor: 'text-indigo-500',
    },
  },
  {
    title: 'Next.js',
    copy: 'Explore Next.js, a powerful React framework for building server-side rendered web applications.',
    url: '',
    tailwindColor: {
      borderHoverColor: 'hover:border-purple-500',
      titleColor: 'text-purple-500',
    },
  },
  {
    title: 'Node.js',
    copy: 'Learn Node.js, a JavaScript runtime, and build scalable network applications for the web.',
    url: '',
    tailwindColor: {
      borderHoverColor: 'hover:border-red-500',
      titleColor: 'text-red-500',
    },
  },
  {
    title: 'MongoDB',
    copy: 'Learn MongoDB, the popular NoSQL database, and how to use it in your web applications.',
    url: '',
    tailwindColor: {
      borderHoverColor: 'hover:border-orange-500',
      titleColor: 'text-orange-500',
    },
  },
];

export const CoursesCardGroup = () => {
  return (
    <section
      className={`mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap justify-center w-full`}
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
  const { title, copy, tailwindColor, url } = course;
  const comingSoon = !url;
  return (
    <Link
      href={url}
      className={`${comingSoon ? 'opacity-55 hover:opacity-100 focus:opacity-100' : ''} group border px-5 py-7 rounded-xl flex flex-col gap-3 ${tailwindColor.borderHoverColor}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className={`uppercase font-medium ${tailwindColor.titleColor}`}>
            {title}
          </h2>
          {comingSoon && (
            <span className="px-1 text-[12px] font-medium border bg-slate-100 text-slate-600 rounded-full">
              Coming soon
            </span>
          )}
        </div>
        <span
          className={`hidden group-hover:inline text-slate-500 ${tailwindColor.titleColor}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <p className="text-slate-700 transition-all delay-100 group-hover:text-slate-800 text-sm">
        {copy}
      </p>
    </Link>
  );
};
