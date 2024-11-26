import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  let domain = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
