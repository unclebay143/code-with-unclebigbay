import {
  Activity as ActivityIcon,
  CheckCheckIcon,
  LibraryBig,
} from 'lucide-react';
import { Overview } from '@/utils/types';

export const convertEmptyStringToNull = (str: string) =>
  str === '' ? null : str;

export const convertNullableStringToEmptyString = (str?: string | null) =>
  str ?? '';

export const convertWhiteSpaceToDash = (value: string) =>
  value.replace(/\s/g, '-'); // remove space

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursDisplay = hours > 0 ? `${hours}hrs` : '';
  const minutesDisplay = minutes > 0 ? `${minutes}m` : '';
  const secondsDisplay = remainingSeconds > 0 ? `${remainingSeconds}s` : '';

  return `${hoursDisplay} ${minutesDisplay} ${secondsDisplay}`.trim();
};

export const overviews: Overview[] = [
  { id: 'total', label: 'Total enrolled', Icon: LibraryBig, count: 103 },
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

export const formatDate = (date: string) => {
  if (!date) return;
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const showCount = (count: number | string) => {
  if (!count) return '';
  return `(${count})`;
};
