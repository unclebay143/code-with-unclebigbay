import { getCourses, getCurrentStudent } from '@/utils/server.service';
import CoursesPage from './courses';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses - Dashboard',
};

const Page = async () => {
  const [studentRes, coursesRes] = await Promise.all([
    getCurrentStudent(),
    getCourses(),
  ]);

  const courses = coursesRes?.courses;

  // ts guard for courses
  if (courses) {
    return (
      <CoursesPage
        courses={courses}
        currentStudent={studentRes?.student ? studentRes?.student : null}
      />
    );
  }
};

export default Page;
