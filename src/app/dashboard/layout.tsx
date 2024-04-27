import { Inter } from 'next/font/google';
import { DashboardIndex } from '.';
import { Metadata } from 'next';
import { baseURL } from '../../../frontend.config';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Student } from '@/utils/types';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard | Code with Unclebigbay',
  description: 'Learn to Code and Build Your Career',
};

async function getCurrentStudent() {
  try {
    const session = await getServerSessionWithAuthOptions();

    const url = `${baseURL}/api/auth/student/${session?.user?.email}`;
    const result = await fetch(url, {
      cache: 'no-store',
    });

    if (!result.ok) {
      console.log(result.statusText);
      return [];
    }

    const { student } = await result.json();

    return { student, session };
  } catch (error) {
    console.log({ error });
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentStudentRes = (await getCurrentStudent()) as {
    student: Student;
    session: any;
  };

  const student = currentStudentRes?.student;
  const session = currentStudentRes?.session;

  return (
    <section className={inter.className}>
      <DashboardIndex currentStudent={student} session={session}>
        {children}
      </DashboardIndex>
    </section>
  );
}
