'use client';

import { Navbar } from '@/components/molecules/dashboard/navbar';
import {
  Sidebar,
  SidebarMobile,
} from '@/components/molecules/dashboard/sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export const DashboardIndex = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!session && status === 'loading') return null;
  if (!session && status === 'unauthenticated') redirect('/');

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Navbar session={session} setSidebarOpen={setSidebarOpen} />
      <main className="relative flex gap-3 w-full max-w-7xl mx-auto px-4 xl:px-0">
        <Sidebar />
        <SidebarMobile
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex flex-col gap-4 w-full dark:bg-slate-950 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};
