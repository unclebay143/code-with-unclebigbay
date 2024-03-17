'use client';

import { Navbar } from '@/components/molecules/dashboard/navbar';
import {
  Sidebar,
  SidebarMobile,
} from '@/components/molecules/dashboard/sidebar';
import { handleAuthentication } from '@/utils/auth';
import { sidebarLinks } from '@/utils/consts/links';
import { Student } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { useState } from 'react';

export const DashboardIndex = ({
  children,
  currentStudent,
}: {
  children: React.ReactNode;
  currentStudent: Student;
}) => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = currentStudent?.isAdmin;
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2] || pathname.split('/')[1];
  const adminRoute = pathname.includes('/admin');
  const onboardingRoutes = sidebarLinks.map((link) => {
    if (link.showOnBoard) {
      return link.slug;
    }
  });
  const pathIsOnboarding = onboardingRoutes.includes(currentPageName);

  const allowedDashboardRoute = sidebarLinks.map((link) => {
    if (!link.requireAuth) return link.key;
  });

  const requireAdminAccess = !isAdmin && adminRoute;
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

  const redirectToOnboard = !currentStudent?.stack && !pathIsOnboarding;
  if (redirectToOnboard) {
    return redirect('/dashboard/onboard');
  }
  const blockOnboardPage =
    currentStudent?.stack && currentPageName === 'onboard';
  if (blockOnboardPage) {
    return redirect('/dashboard');
  }

  if (requireAdminAccess) {
    return redirect('/dashboard/overview');
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Navbar session={session} setSidebarOpen={setSidebarOpen} />
      <main className="relative flex gap-3 w-full max-w-7xl mx-auto px-4 xl:px-0">
        <Sidebar
          isLoggedIn={!!session}
          isAdmin={isAdmin}
          isOnboardingCompleted={!!currentStudent?.stack}
        />
        <SidebarMobile
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          isLoggedIn={!!session}
          isAdmin={isAdmin}
          isOnboardingCompleted={!!currentStudent?.stack}
        />
        <div className="flex flex-col gap-4 w-full dark:bg-slate-950 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};
