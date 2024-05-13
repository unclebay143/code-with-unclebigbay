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

  if (!coursesRes || !studentRes) return null;

  const courses = coursesRes?.courses;
  const { student: currentStudent } = studentRes;

  return <CoursesPage courses={courses} currentStudent={currentStudent} />;
};

export default Page;
