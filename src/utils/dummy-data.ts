import {
  Activity as ActivityIcon,
  CheckCheckIcon,
  LibraryBig,
} from 'lucide-react';
import { Activity, Materials, Overview } from '../../types';

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
    title: 'Introduction to HTML',
    description:
      'Everything you need to test your React apps with React Testing Library',
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU&t=436s',
    type: 'video',
    coverImageURL:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708988011051/e276e91e-7887-44eb-8129-c63fae9e8262.webp',
  },
  {
    title: 'Introduction to CSS',
    description:
      "This is introduction to HTML, you'll learn about the basics of html and the html tags and attributes.",
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU&t=436s',
    type: 'video',
    coverImageURL:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708982962345/f8a881dd-bfcf-4fae-8bf4-8d85219f9ed8.png',
  },
  {
    title: 'Introduction to JavaScript',
    description:
      "This is introduction to HTML, you'll learn about the basics of html and the html tags and attributes.",
    url: 'https://www.youtube.com/watch?v=fS1lArPOHOU&t=436s',
    type: 'video',
    coverImageURL:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1708947937926/9344241c-d2f5-4dc6-86e7-9fffd2927aa7.webp',
  },
];
