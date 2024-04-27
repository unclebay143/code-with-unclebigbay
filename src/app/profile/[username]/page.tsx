import React from 'react';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/atoms/Navbar';
import { SectionWrapper } from '@/components/molecules/home';
import { Footer } from '@/components/atoms/Footer';
import { Student } from '@/utils/types';
import { Metadata } from 'next';

import { getCurrentStudent } from '@/utils/server.service';
import { Profile } from './profile';

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  const data = await getCurrentStudent(username);
  const student = data?.studentRes.student as Student;
  const userFullName = student.fullName;
  const bio = student.bio;

  return {
    title: `${userFullName} - Code with Unclebigbay`,
    description: `${userFullName}'s profile on Code with Unclebigbay. ${bio || ''}`,
  };
}

const Page = async ({ params }: { params: { username: string } }) => {
  const data = await getCurrentStudent(params?.username);

  if (!data) notFound();

  const { studentRes, canUpdateProfile, session } = data || {};
  const { student } = studentRes as { student: Student };

  const profileProps = { canUpdateProfile, student };

  return (
    <div className="flex flex-col gap-5">
      <Navbar session={session} />
      <SectionWrapper>
        <WhiteArea border>
          <div className="max-w-4xl mx-auto pt-5 pb-10">
            <Profile {...profileProps} />
          </div>
        </WhiteArea>
        <Footer />
      </SectionWrapper>
    </div>
  );
};

export default Page;
