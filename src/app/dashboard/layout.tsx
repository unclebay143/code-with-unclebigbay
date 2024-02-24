import { Navbar } from '@/components/dashboard/navbar';
import { Sidebar } from '@/components/dashboard/sidebar';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
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
