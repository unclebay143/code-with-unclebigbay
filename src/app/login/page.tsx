import SigninWithGithub from '@/components/ui/SigninWithGithub';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../utils/auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/');
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-start gap-4 p-5  w-[30%] border border-black/30 ">
        <h1 className="font-extrabold">Please sign in </h1>
        <SigninWithGithub />
      </div>
    </div>
  );
}
