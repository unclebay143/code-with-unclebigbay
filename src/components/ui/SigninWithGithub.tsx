'use client';

import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function SigninWithGithub() {
  return (
    <button
      onClick={() =>
        signIn('github', {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className="bg-black rounded p-2 text-white hover:bg-black/80 duration-300 font-medium flex gap-4 justify-center items-center  w-full"
    >
      Login with github
      <FaGithub />
    </button>
  );
}
