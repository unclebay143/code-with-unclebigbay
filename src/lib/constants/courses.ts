export type Course = {
  latest?: boolean;
  title: string;
  copy: string;
  url: string;
  tailwindColor: { borderHoverColor: string; titleColor: string };
};

export type Courses = Course[];

export const courses: Courses = [
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
    latest: true,
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
