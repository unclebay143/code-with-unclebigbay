import { Inter } from 'next/font/google';
import { Provider } from './provider';
import './globals.css';
import './radix.css';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coding Tutorials and Career-Focused Resources for Developers',
  description:
    'Kickstart your tech journey with expert-led tutorials and projects. Learn web development, JavaScript, and more to build skills employers love.',
  // 'Kickstart your tech journey with expert-led coding tutorials, real-world projects, and career-focused resources. Learn web development, JavaScript, and more with Unclebigbay to build skills that employers love. Perfect for aspiring developers seeking practical skills and career growth!',
  // 'Learn coding the right way with structured tutorials, hands-on projects, hackathons, and beginner-friendly courses. Master web development, JavaScript, and more with Unclebigbay. Perfect for aspiring developers seeking practical skills and career growth!',
  // "Master in-demand coding skills & launch your tech career with Unclebigbay's online courses. Beginner-friendly, project-based learning. Enroll today!",
  authors: [{ name: 'Unclebigbay', url: 'https://x.com/@Unclebigbay143' }],
  openGraph: {
    images: [
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1717620330883/b93fbecd-a595-4d35-81a3-265e92d50c26.png?auto=compress',
    ],
  },
  generator: 'Next.js',
  keywords: [
    'code',
    'unclebigbay',
    'code with',
    'codewith',
    'codewithunclebigbay',
    'web development',
    'javascript',
    'react',
    'node.js',
    'next.js',
    'web dev',
    'html',
    'css',
    'python',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Unclebigbay',
  publisher: 'Unclebigbay',
  metadataBase: new URL('https://www.codewithunclebigbay.com/'),
  verification: {
    google: 'jghWH5GFsXvnkFMtanhXklakUXw_OxkHc2WOSH_K9tM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        defer
        data-website-id="678a15077150df130664c390"
        data-domain="codewithunclebigbay.com"
        src="https://datafa.st/js/script.js"
      />

      <body className={inter.className}>
        <Provider>{children}</Provider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
        <Analytics />
      </body>
    </html>
  );
}
