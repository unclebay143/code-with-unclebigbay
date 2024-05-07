import {
  getAllActivityAudits,
  getEnrolledCourses,
} from '@/utils/server.service';
import Overview from './overview';

const Page = async () => {
  const auditsRes = await getAllActivityAudits();
  const audits = auditsRes!.audits;

  const enrolledCoursesRes = await getEnrolledCourses();
  const enrolledCourses = enrolledCoursesRes?.enrolledCourses;

  return (
    <Overview
      // overviews={overviews}
      audits={audits}
      enrolledCourses={enrolledCourses}
    />
  );
};

export default Page;
