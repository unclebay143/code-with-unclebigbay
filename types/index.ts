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
};

export type SidebarLinks = SidebarLink[];
