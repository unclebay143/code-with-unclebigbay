import { Course } from '@/models/course';
import { Hackathon } from '@/models/hackathon';
import connectViaMongoose from '@/utils/mongoose';

export const revalidate = 3600; // revalidate at most every hour

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL!;

type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
  alternates?: {
    // languages?: Languages<string>;
  };
}>;

export default async function sitemap(): Promise<Sitemap> {
  await connectViaMongoose();

  const [courses, hackathons] = await Promise.all([
    Course.find({}),
    Hackathon.find({}),
  ]);

  const coursesSitemap = courses.map((course) => {
    return {
      url: `${siteUrl}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  const hackathonsSitemap = hackathons.map((hackathon) => {
    return {
      url: `${siteUrl}/hackathons/${hackathon.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hackathons`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/help-centers`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...coursesSitemap,
    ...hackathonsSitemap,
  ];
}
