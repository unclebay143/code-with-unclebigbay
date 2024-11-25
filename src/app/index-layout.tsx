import React from 'react';
import { Footer } from '@/components/atoms/Footer';
import { Navbar } from '@/components/atoms/Navbar';
import { SectionWrapper } from '@/components/molecules/home';
import { Session } from 'next-auth';

export const PublicLayout = ({
  children,
  hideFooter,
  session,
}: {
  children: React.ReactNode;
  hideFooter?: boolean;
  session?: Session | null;
}) => {
  return (
    <div>
      <SectionWrapper>
        <Navbar session={session} />
        {children}
        {hideFooter ?? <Footer />}
      </SectionWrapper>
    </div>
  );
};
