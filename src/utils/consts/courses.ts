export const COURSE_REPO = 'unclebay143/code-with-unclebigbay';
export const COURSE_REPO_ID = 'MDQ6VXNlcjU4OTE5NjE5';
export const CATEGORY = 'Courses';
export const CATEGORY_ID = 'DIC_kwDOLQhQ_s4Chv7d';

export type Course = {
  latest?: boolean;
  title: string;
  copy: string;
  url: string;
  color: string;
  tag: string;
};

export type Courses = Course[];

export const courses: Courses = [
  {
    tag: 'html',
    title: 'HTML',
    copy: 'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.',
    url: '/courses',
    color: '#0ea5e9',
  },
  {
    tag: 'css',
    latest: true,
    title: 'CSS',
    copy: 'Dive into CSS and learn how to style your web pages to make them visually appealing.',
    url: '/courses',
    color: '#22c55e',
  },
  {
    tag: 'javascript',
    title: 'JavaScript',
    copy: 'Master JavaScript basics and add interactivity to your websites with dynamic scripting.',
    url: '',
    color: '#eab308',
  },
  {
    tag: 'tailwindcss',
    title: 'Tailwind CSS',
    copy: 'Master the modern utility-first CSS framework and streamline your web development workflow.',
    url: '',
    color: '#14b8a6',
  },
  {
    tag: 'react',
    title: 'React',
    copy: 'Discover React, a popular JavaScript library for building user interfaces, and create dynamic web applications.',
    url: '',
    color: '#6366f1',
  },
  {
    tag: 'nextjs',
    title: 'Next.js',
    copy: 'Explore Next.js, a powerful React framework for building server-side rendered web applications.',
    url: '',
    color: '#a855f7',
  },
  {
    tag: 'nodejs',
    title: 'Node.js',
    copy: 'Learn Node.js, a JavaScript runtime, and build scalable network applications for the web.',
    url: '',
    color: '#ef4444',
  },
  {
    tag: 'mongodb',
    title: 'MongoDB',
    copy: 'Learn MongoDB, the popular NoSQL database, and how to use it in your web applications.',
    url: '',
    color: '#f97316',
  },
];
