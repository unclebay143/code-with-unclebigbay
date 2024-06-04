import { Metadata } from 'next';
import Course from './course';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseSlug = params.id;
  const prod = process.env.NODE_ENV === 'production';
  const baseUrl = prod
    ? 'https://www.codewithunclebigbay.com'
    : 'http://localhost:3001';
  const url = baseUrl + '/api/courses/' + courseSlug;
  const res = await fetch(url);
  const { course } = await res.json();

  return {
    title: course.title,
    description: course.brief,
    openGraph: {
      images: [course.coverImageUrl],
    },
  };
}

const Page = () => {
  return <Course />;
};

export default Page;
