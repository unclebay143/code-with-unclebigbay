import {
  ActivityIcon,
  BarChart,
  Book,
  HelpCircle,
  LibraryBig,
  Settings,
  Trophy,
} from 'lucide-react';
import { SidebarLinks } from '@/utils/types';

export const sidebarLinks: SidebarLinks = [
  {
    key: 'overview',
    label: 'overview',
    slug: 'overview',
    Icon: BarChart,
    requireAuth: true,
  },
  {
    key: 'courses',
    label: 'courses',
    slug: 'courses',
    Icon: LibraryBig,
    requireAuth: false,
  },
  {
    key: 'leaderboard',
    label: 'leaderboard',
    slug: 'leaderboard',
    Icon: Trophy,
    requireAuth: false,
  },
  {
    key: 'activity',
    label: 'Activity Log',
    slug: 'activity',
    Icon: ActivityIcon,
    requireAuth: true,
  },
  {
    key: 'settings',
    label: 'settings',
    slug: 'settings',
    Icon: Settings,
    shadowHide: true,
    requireAuth: true,
  },
  {
    key: 'help-centers',
    label: 'Help Centers',
    slug: 'help-centers',
    Icon: HelpCircle,
    shadowHide: true,
    requireAuth: true,
  },
  {
    key: 'questions',
    label: 'Questions',
    slug: 'questions',
    Icon: Book,
    adminAccess: true,
    requireAuth: true,
  },
];
