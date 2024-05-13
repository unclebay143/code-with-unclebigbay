import {
  getAllActivityAudits,
  getDailyQuote,
  getEnrolledCourses,
  widgetVisibility,
} from '@/utils/server.service';
import Overview from './overview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overview - Dashboard',
};

const Page = async () => {
  const auditsRes = await getAllActivityAudits();
  const audits = auditsRes!.audits;
  const quoteRes = await getDailyQuote();
  const cookieRes = widgetVisibility();

  const enrolledCoursesRes = await getEnrolledCourses();
  const enrolledCourses = enrolledCoursesRes?.enrolledCourses;

  return (
    <Overview
      // overviews={overviews}
      audits={audits}
      enrolledCourses={enrolledCourses}
      quoteRes={quoteRes}
      cookieRes={cookieRes}
    />
  );
};

export default Page;
