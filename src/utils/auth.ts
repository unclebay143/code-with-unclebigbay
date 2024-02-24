import { signIn } from 'next-auth/react';

export const handleAuthentication = () =>
  signIn('github', {
    callbackUrl: `${window.location.origin}/dashboard`,
  });
