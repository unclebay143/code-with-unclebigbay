import {
  ActivityIcon,
  BarChart,
  Book,
  Box,
  DoorOpen,
  HelpCircle,
  LibraryBig,
  Settings,
  TagIcon,
  Trophy,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export type SidebarLink = {
  key: string;
  label: string;
  slug: string;
  Icon: LucideIcon;
  isActive?: boolean;
  shadowHide?: boolean;
  onClick?: () => void;
  adminAccess?: boolean;
  disabled?: boolean;
  showOnBoard?: boolean;
  hideAfterOnboard?: boolean;
  isNew?: boolean;
};

export type SidebarLinks = SidebarLink[];

const onboarding: SidebarLink = {
  key: 'onboard',
  label: 'onboard',
  slug: 'onboard',
  Icon: DoorOpen,
};

const helpCenter: SidebarLink = {
  key: 'help-centers',
  label: 'Help Centers',
  slug: 'help-centers',
  Icon: HelpCircle,
};

const courses: SidebarLink = {
  key: 'courses',
  label: 'courses',
  slug: 'courses',
  Icon: LibraryBig,
};

const overview: SidebarLink = {
  key: 'overview',
  label: 'overview',
  slug: 'overview',
  Icon: BarChart,
};

const leaderboard: SidebarLink = {
  key: 'leaderboard',
  label: 'leaderboard',
  slug: 'leaderboard',
  Icon: Trophy,
};

const activity: SidebarLink = {
  key: 'activity',
  label: 'Activity Log',
  slug: 'activity',
  Icon: ActivityIcon,
};

const settings: SidebarLink = {
  key: 'settings',
  label: 'settings',
  slug: 'settings',
  Icon: Settings,
  shadowHide: true,
};

const questions: SidebarLink = {
  key: 'questions',
  label: 'Questions',
  slug: 'admin/questions',
  Icon: Book,
};

const hackathons: SidebarLink = {
  key: 'hackathons',
  label: 'Hackathons',
  slug: 'hackathons',
  Icon: Box,
};

const tags: SidebarLink = {
  key: 'tags',
  label: 'Tags',
  slug: 'admin/tags',
  Icon: TagIcon,
};

export const onboardingLinks: SidebarLinks = [onboarding, helpCenter];
export const publicLinks: SidebarLinks = [
  courses,
  hackathons,
  // leaderboard,
  helpCenter,
]; // unauthenticated users

const privateLinks: SidebarLinks = [
  overview,
  courses,
  hackathons,
  // leaderboard,
  activity,
  settings,
  helpCenter,
];
const adminLinks: SidebarLinks = [leaderboard, questions, tags];

export const getSidebarLinks = ({
  isAdmin,
  isLoggedIn,
  isOnboardingCompleted,
}: {
  isAdmin: boolean;
  isLoggedIn: boolean;
  isOnboardingCompleted: boolean;
}): SidebarLinks => {
  if (isAdmin) return [...privateLinks, ...adminLinks];
  if (isLoggedIn && !isOnboardingCompleted) return onboardingLinks;
  if (isLoggedIn && isOnboardingCompleted) return privateLinks;
  return publicLinks;
};
