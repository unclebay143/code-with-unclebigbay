'use client';

import { AuthModal } from '@/components/atoms/AuthModal';
import { Navbar } from '@/components/molecules/dashboard/navbar';
import { Sidebar } from '@/components/molecules/dashboard/sidebar';
import { onboardingLinks, publicLinks } from '@/utils/consts/links';
import { Student } from '@/utils/types';
import { redirect, usePathname } from 'next/navigation';
import { useState } from 'react';

export const DashboardIndex = ({
  children,
  currentStudent,
  session,
}: {
  children: React.ReactNode;
  currentStudent: Student;
  session: any;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = currentStudent?.isAdmin;
  const pathname = usePathname();
  const currentPageName = pathname.split('/')[2] || pathname.split('/')[1];
  const adminRoute = pathname.includes('/admin');
  const onboardingRoutes = onboardingLinks.map((link) => link.slug);
  const pathIsOnboarding = onboardingRoutes.includes(currentPageName);

  const unAuthenticatedRoutes = publicLinks.map((link) => link.key);

  const requireAdminAccess = !isAdmin && adminRoute;
  const canAccessWithoutAuth = unAuthenticatedRoutes.includes(currentPageName);
  const requireAuth = !session && !canAccessWithoutAuth;

  if (requireAuth) {
    if (typeof window !== 'undefined') {
      return (
        <AuthModal
          isOpen
          close={() => null}
          nextUrl={window.location.href}
          type="login"
        />
      );
    }

    return null;
  }

  const redirectToOnboard =
    !canAccessWithoutAuth && !currentStudent?.stack && !pathIsOnboarding;
  if (redirectToOnboard) {
    return redirect('/dashboard/onboard');
  }
  const blockOnboardPage =
    currentStudent?.stack && currentPageName === 'onboard';
  if (blockOnboardPage) {
    return redirect('/dashboard');
  }

  if (requireAdminAccess) {
    return redirect('/dashboard');
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Navbar
        session={session}
        currentStudent={currentStudent}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="relative flex gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0">
        <Sidebar
          isLoggedIn={!!session}
          isAdmin={isAdmin}
          isOnboardingCompleted={!!currentStudent?.stack}
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
