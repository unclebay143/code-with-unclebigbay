import { signIn, signOut } from 'next-auth/react';

export const handleAuthentication = ({
  nextUrl,
  provider,
}: {
  nextUrl?: string;
  provider: 'github' | 'google';
}) => {
  signIn(provider, {
    callbackUrl: nextUrl || `${window.location.origin}/overview`,
  });
};

export const handleLogout = () => {
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
};
