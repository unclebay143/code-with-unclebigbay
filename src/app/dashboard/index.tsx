'use client';

import { Navbar } from '@/components/dashboard/navbar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const DashboardIndex = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (!session && status === 'loading') return null;
  if (!session && status === 'unauthenticated') redirect('/');

  return (
    <div className="flex flex-col gap-5 pb-10">
      <Navbar session={session} />
      <main className="flex gap-3 w-full max-w-7xl mx-auto px-4 2xl:px-0">
        <Sidebar />
        <div className="flex flex-col gap-4 w-full dark:bg-slate-950 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};
