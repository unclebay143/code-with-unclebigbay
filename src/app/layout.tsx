'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Code with Unclebigbay</title>
        <meta
          property="description"
          content="Learn to Code and Build Your Career"
        />
        <meta property="author" content="Unclebigbay" />
        <meta property="og:author" content="Unclebigbay" />
        <meta property="og:title" content="Code with Unclebigbay" />
        <meta
          property="og:description"
          content="Learn to Code and Build Your Career"
        />
      </Head>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
