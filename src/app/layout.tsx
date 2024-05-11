import { Inter } from 'next/font/google';
import { LayoutIndex } from './layoutIndex';
import './globals.css';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
  authors: [{ name: 'Unclebigbay', url: 'https://x.com/@Unclebigbay143' }],
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
      </body>
    </html>
  );
}
