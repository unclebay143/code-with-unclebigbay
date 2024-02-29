import { LucideIcon } from 'lucide-react';

export type Material = {
  title: string;
  description: string;
  url: string;
  type: 'video' | 'post';
  coverImageURL: string;
  embedURL: string;
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
