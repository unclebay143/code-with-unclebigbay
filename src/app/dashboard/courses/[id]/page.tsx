import { Metadata } from 'next';
import Course from './course';
import { Course as CourseType } from '@/utils/types';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseSlug = params.id;
  const res = await fetch(
    'https://www.codewithunclebigbay.com/api/courses/' + courseSlug,
  );
  const data: CourseType = await res.json();

  return {
    title: data.title,
    description: data.brief,
    openGraph: {
      images: [data.coverImageUrl],
    },
  };
}

const Page = () => {
  return <Course />;
};

export default Page;
