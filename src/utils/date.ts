import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export function formatDate(startDate: string, endDate: string) {
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
