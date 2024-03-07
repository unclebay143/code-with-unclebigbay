import { LucideIcon } from 'lucide-react';

export type Material = {
  title: string;
  description: string;
  url: string;
  type: 'video' | 'post';
  coverImageUrl: string;
  embedURL: string;
  duration: string;
  date: string;
  enrolled?: boolean;
};

export type Materials = Material[];

export type Activity = {
  type?: string;
  date: number;
  title: string;
  description?: string;
};

export type Overview = {
  id: string;
  label: string;
  Icon: LucideIcon;
  count: number;
  active?: boolean;
  setCurrentCourse?: Function;
};

export type CommunityMember = {
  name: string;
  stack: string;
  username: string;
  photo: string;
  totalScore: number;
  flag: string;
  rank: number;
};

export type CommunityMembers = CommunityMember[];

export type SidebarLink = {
  key: string;
  label: string;
  slug: string;
  Icon: LucideIcon;
  isActive?: boolean;
  shadowHide?: boolean;
  onClick?: () => void;
  adminAccess?: boolean;
  requireAuth: boolean;
  disabled?: boolean;
};

export type SidebarLinks = SidebarLink[];

export type Option = {
  option: string;
  isCorrect?: boolean;
};
export type Options = Option[];
export type Question = {
  id?: string;
  question: string;
  options: Options;
  answerExplanation?: string;
};
export type Questions = Question[];

export type Student = {
  fullName: string;
  email: string;
  username: string;
  bio: string;
  socials: {
    portfolio: string;
    blog: string;
    github: string;
    x: string;
    facebook: string;
    mastodon: string;
    thread: string;
    stackoverflow: string;
    linkedin: string;
    youtube: string;
    instagram: string;
  };
  stack: string;
  photo: string;
  isPro: boolean;
  accountOnHold: boolean;
  isBanned: boolean;
  isAnonymous: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  nationality: string;
  state: string;
  location: string;
  gender: string;
  interests: string;
};
