import { Inter } from 'next/font/google';
import { LayoutIndex } from './layoutIndex';
import './globals.css';
import './radix.css';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
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
      <body className={inter.className}>
        <LayoutIndex>{children}</LayoutIndex>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
        <Analytics />
      </body>
    </html>
  );
}
