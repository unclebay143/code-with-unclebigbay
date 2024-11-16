import React from 'react';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/atoms/Navbar';
import { SectionWrapper } from '@/components/molecules/home';
import { Footer } from '@/components/atoms/Footer';
import { Metadata } from 'next';

import { getCurrentStudentByUsername } from '@/utils/services/server/student.server';
import { Profile } from './profile';
import { convertToTitleCase } from '@/utils';

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;
  const data = await getCurrentStudentByUsername(username);

  const student = data?.student;
  const userFullName = student?.fullName;
  const userName = student?.username;
  const bio = student?.bio;
  const pageTitle = userFullName || userName;

  return {
    title: `${convertToTitleCase(pageTitle ?? '')} - Code with Unclebigbay`,
    description: `${userFullName}'s profile on Code with Unclebigbay. ${bio || ''}`,
  };
}

const Page = async ({ params }: { params: { username: string } }) => {
  const data = await getCurrentStudentByUsername(params?.username);

  if (!data) notFound();

  const { student, canUpdateProfile, session } = data;

  const profileProps = {
    canUpdateProfile,
    student,
  };

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
