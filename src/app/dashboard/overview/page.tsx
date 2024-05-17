import {
  getAllActivityAudits,
  getEnrolledCourses,
  getQuote,
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
  const quote = await getQuote();
  const quoteWidgetVisibility = widgetVisibility();

  const enrolledCoursesRes = await getEnrolledCourses();
  const enrolledCourses = enrolledCoursesRes?.enrolledCourses;

  return (
    <Overview
      audits={audits}
      enrolledCourses={enrolledCourses}
      quote={quote!}
      quoteWidgetVisibility={quoteWidgetVisibility}
    />
  );
};

export default Page;
