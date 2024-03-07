'use client';

import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { Navbar } from '@/components/molecules/dashboard/navbar';
import {
  Sidebar,
  SidebarMobile,
} from '@/components/molecules/dashboard/sidebar';
import { handleAuthentication } from '@/utils/auth';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const DashboardIndex = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: user } = useCurrentStudent();
  const isAdmin = user?.isAdmin;
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2];

  const allowedDashboardRoute = ['courses', 'leaderboard'];
  const canAccessWithoutAuth = allowedDashboardRoute.includes(currentPageName);

  const isCheckingAuthStatus = !session && status === 'loading';
  const requireAuth =
    !session && status === 'unauthenticated' && !canAccessWithoutAuth;

  if (isCheckingAuthStatus) {
    return null;
  }

  if (requireAuth) {
    handleAuthentication({ nextUrl: window.location.href });
    return null;
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Navbar session={session} setSidebarOpen={setSidebarOpen} />
      <main className="relative flex gap-3 w-full max-w-7xl mx-auto px-4 xl:px-0">
        <Sidebar isLoggedIn={!!session} isAdmin={isAdmin} />
        <SidebarMobile
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          isLoggedIn={!!session}
          isAdmin={isAdmin}
        />
        <div className="flex flex-col gap-4 w-full dark:bg-slate-950 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};
