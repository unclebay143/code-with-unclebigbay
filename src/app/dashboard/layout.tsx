import { Inter } from 'next/font/google';
import { DashboardIndex } from '.';
import { baseURL } from '../../../frontend.config';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Student } from '@/utils/types';

const inter = Inter({ subsets: ['latin'] });

async function getCurrentStudent() {
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
