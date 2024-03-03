import {
  ActivityIcon,
  BarChart,
  Book,
  HelpCircle,
  LibraryBig,
  Settings,
  Trophy,
} from 'lucide-react';
import { SidebarLinks } from '../../../types';

export const sidebarLinks: SidebarLinks = [
  { key: 'overview', label: 'overview', slug: 'overview', Icon: BarChart },
  { key: 'courses', label: 'courses', slug: 'courses', Icon: LibraryBig },
  {
    key: 'leaderboard',
    label: 'leaderboard',
    slug: 'leaderboard',
    Icon: Trophy,
  },
  {
    key: 'activity',
    label: 'Activity Log',
    slug: 'activity',
    Icon: ActivityIcon,
  },
  {
    key: 'settings',
    label: 'settings',
    slug: 'settings',
    Icon: Settings,
    shadowHide: true,
  },
  {
    key: 'help-centers',
    label: 'Help Centers',
    slug: 'help-centers',
    Icon: HelpCircle,
    shadowHide: true,
  },
  {
    key: 'questions',
    label: 'Questions',
    slug: 'questions',
    Icon: Book,
    adminAccess: true,
  },
];
