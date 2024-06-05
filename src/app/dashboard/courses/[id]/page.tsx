import { Metadata } from 'next';
import Course from './course';
import { baseURL } from '../../../../../frontend.config';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseSlug = params.id;
  const url = baseURL + '/api/courses/' + courseSlug;
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
