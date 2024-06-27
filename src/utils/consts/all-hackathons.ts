export type ProjectDetails = {
  name: string;
  url: string;
  demoUrl: string;
  articleUrl: string;
  repositoryUrl: string;
  socialUrl: string;
};

export type DisplayHackathons = {
  id: number;
  name: string;
  title: string;
  description: string;
  profileImage: string;
  project: ProjectDetails;
  feedback: string;
};

export type DisplayAllHackathons = DisplayHackathons[];
export const displayAllHackathons: DisplayAllHackathons = [
  {
    id: 1,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.the building block of the web',
    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 2,
    name: 'Idris Haruna',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 3,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses. the building block of the web',
    description:
      'Master JavaScript basics and add interactivity to your websites with dynamic scripting.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 4,
    name: 'Samuel Ayodele',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Master the modern utility-first CSS framework and streamline your web development workflow.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 5,
    name: 'Samuel Ayodele',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Discover React, a popular JavaScript library for building user interfaces, and create dynamic web applications.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 6,
    name: 'Samuel Ayodele',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Explore Next.js, a powerful React framework for building server-side rendered web applications.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 7,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 8,
    name: 'Idris Haruna',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 9,
    name: 'Idris Haruna',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 10,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 11,
    name: 'Idris Haruna',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.the building block of the web',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 12,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 13,
    name: 'Idris Haruna',
    project: {
      name: 'Build a Landing Page, Boost Visibility && create your first web pages for businesses.  the building block of the web',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages. the building block of the web',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 14,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 15,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages. the building block of the web',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 16,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 18,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 19,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 19,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Learn the fundamentals of HTML, the building block of the web, and create your first web pages. the building block of the web',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
  {
    id: 20,
    name: 'Idris Haruna',
    project: {
      name: 'Landing Page Project',
      url: 'https://project-url.com',
      demoUrl: '4wblm-X0rEc',
      articleUrl: 'https://article-url.com',
      repositoryUrl: 'https://repository-url.com',
      socialUrl: 'https://social-url.com',
    },
    profileImage:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    title:
      'Build a Landing Page, Boost Visibility && create your first web pages for businesses',
    description:
      'Dive into CSS and learn how to style your web pages to make them visually appealing.',

    feedback:
      'This hackathon was an amazing experience! The organization, support, and community were top-notch.',
  },
];
