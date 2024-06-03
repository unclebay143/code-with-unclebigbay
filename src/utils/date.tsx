import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export function formatStartAndEndDate(startDate: string, endDate: string) {
  const startDay = dayjs(startDate);
  const endDay = dayjs(endDate);

  // Use `July 1 - 31` format for same month and `July 15 - Aug 15` for multi month
  if (startDay.month() === endDay.month()) {
    // Use format string to show only date and month for both
    return `${startDay.format('MMMM Do')} - ${endDay.format('Do')}`;
  } else {
    // Use format string to show full date for both
    return `${startDay.format('MMMM Do')} - ${endDay.format('MMMM Do')}`;
  }
}

export const formatDate = (date: string) => {
  return dayjs(date).format('MMM Do, YYYY');
};

// @ts-ignore
export const renderer = ({ days, hours, minutes, seconds }) => {
  const parts = [];

  // Handle negative values (optional)
  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
    throw new Error('Time components cannot be negative.');
  }

  // Add non-zero units with proper pluralization
  if (days) {
    parts.push(`${days} ${days > 1 ? 'days' : 'day'}`);
  } else if (hours) {
    parts.push(`${hours} ${hours > 1 ? 'hours' : 'hour'}`);
  } else if (minutes) {
    parts.push(`${minutes} ${minutes > 1 ? 'mins' : 'min'}`);
  } else if (seconds) {
    parts.push(`${seconds} ${seconds > 1 ? 'secs' : 'sec'}`);
  } else {
    parts.push('Ended');
  }

  return (
    <div className="font-bold text-xl text-slate-600">{parts.join(' ')}</div>
  );
};
