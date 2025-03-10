import { Metadata } from 'next';
import Course from './course';
import { baseURL } from '../../../../../frontend.config';
import { getCurrentStudent } from '@/utils/services/server/student.server';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseSlug = params.id;
  const url = baseURL + '/api/courses/' + courseSlug;
  const res = await fetch(url);
  const { course } = await res.json();

  if (!course) {
    return {
      title: 'Course not found',
    };
  }

  return {
    title: course.title,
    description: course.brief,
    openGraph: {
      images: [course.coverImageUrl],
    },
    keywords: [...course.tags],
    alternates: {
      canonical: `/courses/${courseSlug}`,
    },
  };
}

const Page = async () => {
  const studentRes = await getCurrentStudent();
  const student = studentRes && studentRes.student;

  return <Course currentStudent={student} />;
};

export default Page;
