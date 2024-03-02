export type Course = {
  latest?: boolean;
  title: string;
  copy: string;
  url: string;
  color: string;
};

export type Courses = Course[];

export const courses: Courses = [
  {
    title: 'HTML',
    copy: 'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.',
    url: '/courses/html',
    color: '#0ea5e9',
  },
  {
    latest: true,
    title: 'CSS',
    copy: 'Dive into CSS and learn how to style your web pages to make them visually appealing.',
    url: '/courses/css',
    color: '#22c55e',
  },
  {
    title: 'JavaScript',
    copy: 'Master JavaScript basics and add interactivity to your websites with dynamic scripting.',
    url: '',
    color: '#eab308',
  },
  {
    title: 'Tailwind CSS',
    copy: 'Master the modern utility-first CSS framework and streamline your web development workflow.',
    url: '',
    color: '#14b8a6',
  },
  {
    title: 'React',
    copy: 'Discover React, a popular JavaScript library for building user interfaces, and create dynamic web applications.',
    url: '',
    color: '#6366f1',
  },
  {
    title: 'Next.js',
    copy: 'Explore Next.js, a powerful React framework for building server-side rendered web applications.',
    url: '',
    color: '#a855f7',
  },
  {
    title: 'Node.js',
    copy: 'Learn Node.js, a JavaScript runtime, and build scalable network applications for the web.',
    url: '',
    color: '#ef4444',
  },
  {
    title: 'MongoDB',
    copy: 'Learn MongoDB, the popular NoSQL database, and how to use it in your web applications.',
    url: '',
    color: '#f97316',
  },
];
