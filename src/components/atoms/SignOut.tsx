'use client';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <button
      onClick={() =>
        signOut({ callbackUrl: `${window.location.origin}/login` })
      }
    >
      sign out
    </button>
  );
}
