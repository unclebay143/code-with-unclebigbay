import {
  Activity as ActivityIcon,
  CheckCheckIcon,
  LibraryBig,
} from 'lucide-react';
import {
  Activity,
  CommunityMember,
  CommunityMembers,
  Materials,
  Overview,
} from '../../types';

export const activities: Activity[] = [
  { date: Date.now(), title: 'Created an account' },
  { type: 'Course', date: Date.now(), title: 'Started "Introduction to HTML"' },
  { date: Date.now(), title: 'Logged in' },
  {
    type: 'Course',
    date: Date.now(),
    title: 'Completed "Introduction to HTML"',
  },
  { type: 'Course', date: Date.now(), title: 'Deleted "Introduction to HTML"' },
  {
    type: 'Course',
    date: Date.now(),
    title: 'Abandoned "Introduction to HTML"',
  },
  { date: Date.now(), title: 'Updated profile' },
];

export const overviews: Overview[] = [
  { id: 'total', label: 'Total', Icon: LibraryBig, count: 2 },
  {
    id: 'pending',
    label: 'Pending',
    Icon: ActivityIcon,
    count: 3,
  },
  {
    id: 'completed',
    label: 'Completed',
    Icon: CheckCheckIcon,
    count: 100,
  },
];

export const materials: Materials = [
  {
    title: 'Python Programming Basics',
    description:
      'Learn the fundamentals of Python programming language, including variables, data types, loops, and functions.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-25',
    duration: '40m',
    enrolled: true,
  },
  {
    title: 'JavaScript Advanced Concepts',
    description:
      'Dive deep into advanced JavaScript concepts such as closures, prototypes, and async programming.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-26',
    duration: '60m',
  },
  {
    title: 'React.js Crash Course',
    description:
      'A quick and practical guide to learning React.js from scratch, covering components, state, and props.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-27',
    duration: '30m',
  },
  {
    title: 'Data Structures in C++',
    description:
      'Explore various data structures such as arrays, linked lists, stacks, and queues in C++ programming language.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-28',
    duration: '50m',
    enrolled: true,
  },
  {
    title: 'Java Programming Masterclass',
    description:
      'Master Java programming with this comprehensive course covering object-oriented programming, collections, and exceptions.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-29',
    duration: '80m',
    enrolled: true,
  },
  {
    title: 'Web Development Fundamentals',
    description:
      'Get started with web development by learning HTML, CSS, and basic JavaScript.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-30',
    duration: '40m',
  },
  {
    title: 'Machine Learning Basics',
    description:
      'An introduction to machine learning concepts and algorithms, including supervised and unsupervised learning.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-07-31',
    duration: '60m',
    enrolled: true,
  },
  {
    title: 'Node.js Essentials',
    description:
      'Learn the essentials of Node.js, including asynchronous programming, file system operations, and HTTP server creation.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-01',
    duration: '50m',
    enrolled: true,
  },
  {
    title: 'Ruby on Rails Crash Course',
    description:
      'A crash course on Ruby on Rails framework for building web applications, covering MVC architecture and database integration.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-02',
    duration: '30m',
    enrolled: true,
  },
  {
    title: 'Android App Development Basics',
    description:
      'An introductory course on developing Android applications using Java, covering user interfaces and basic functionality.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-03',
    duration: '40m',
    enrolled: true,
  },
  {
    title: 'SQL Fundamentals',
    description:
      'Learn the fundamentals of SQL, including database design, querying, and data manipulation.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-04',
    duration: '60m',
    enrolled: true,
  },
  {
    title: 'Cybersecurity Essentials',
    description:
      'An essential guide to cybersecurity, covering basic concepts, threat analysis, and risk management.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-05',
    duration: '5hrs',
    enrolled: true,
  },
  {
    title: 'Responsive Web Design',
    description:
      'Learn how to create responsive web designs that work across different devices and screen sizes.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-06',
    duration: '4hrs',
  },
  {
    title: 'Cloud Computing Fundamentals',
    description:
      'An introduction to cloud computing, covering basic concepts, service models, and deployment models.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-07',
    duration: '6hrs',
  },
  {
    title: 'Blockchain Basics',
    description:
      'An overview of blockchain technology, covering its principles, applications, and potential impact.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-08',
    duration: '5hrs',
  },
  {
    title: 'Data Science Fundamentals',
    description:
      'Learn the fundamentals of data science, including data analysis, machine learning, and data visualization.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-09',
    duration: '6hrs',
  },
  {
    title: 'Angular Essentials',
    description:
      'An essential guide to Angular framework for building web applications, covering components, services, and routing.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-10',
    duration: '5hrs',
  },
  {
    title: 'Flutter App Development',
    description:
      'Get started with Flutter for building cross-platform mobile applications, covering widgets, layouts, and state management.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-11',
    duration: '6hrs',
  },
  {
    title: 'GraphQL Fundamentals',
    description:
      'An introduction to GraphQL, covering schema design, queries, mutations, and subscriptions.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-12',
    duration: '4hrs',
  },
  {
    title: 'Vue.js Essentials',
    description:
      'A comprehensive guide to Vue.js for building interactive web interfaces, covering components, directives, and state management.',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU',
    type: 'video',
    coverImageUrl:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
    embedURL: 'https://www.youtube.com/embed/fS1lArPOHOU',
    date: '2023-08-13',
    duration: '5hrs',
  },
];

export const communityMember: CommunityMember = {
  name: 'Ayodele S. Adebayo',
  stack: 'frontend',
  username: 'unclebigbay',
  photo:
    'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
  totalScore: 10,
  flag: '🇦🇺',
};

export const communityMembers: CommunityMembers = [
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 1000,
    flag: '',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: '',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 190,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: '',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 180,
    flag: '',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 180,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 170,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 160,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 60,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 50,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 30,
    flag: '🇦🇺',
  },
  {
    name: 'Ayodele S. Adebayo',
    stack: 'frontend',
    username: 'unclebigbay',
    photo:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg',
    totalScore: 20,
    flag: '🇦🇺',
  },
];
