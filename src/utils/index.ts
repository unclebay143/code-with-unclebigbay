import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const DEFAULT_PROFILE_PHOTO =
  'https://cdn.hashnode.com/res/hashnode/image/upload/v1687261896574/vKUU-ural.png';

export const ONBOARDING_YT_VIDEO_ID = 'RKhDqw6g1nE';

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

export function capitalizeFirstLetter(word: string) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const hasHackathonEnded = (endDate: string) =>
  dayjs().isAfter(dayjs(endDate));

export const showUpMotion = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

export const removeArrayDuplicates = <T>(array: T[]): T[] =>
  Array.from(new Set(array));

export const convertToTitleCase = (string: string) => {
  const str = string.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};
