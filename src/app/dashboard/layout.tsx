import { Inter } from 'next/font/google';
import { DashboardIndex } from '.';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard | Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={inter.className}>
      <DashboardIndex>{children}</DashboardIndex>
    </section>
  );
}
