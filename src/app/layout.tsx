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
