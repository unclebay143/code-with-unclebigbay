import { signIn, signOut } from 'next-auth/react';

export const handleAuthentication = () =>
  signIn('github', {
    callbackUrl: `${window.location.origin}/dashboard`,
  });

export const handleLogout = () =>
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
