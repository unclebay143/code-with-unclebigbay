'use client';

import { Navbar } from '@/components/dashboard/navbar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (!session && status === 'loading') return null;
  if (!session && status === 'unauthenticated') redirect('/');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        <main className="flex">
          <Sidebar />
          <div className="flex flex-col gap-4 min-h-[calc(100vh-75px)] w-full grow dark:bg-slate-950 p-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
