import { signIn, signOut } from 'next-auth/react';

export const handleAuthentication = (props: any) => {
  const { nextUrl } = props;
  signIn('github', {
    callbackUrl: nextUrl || `${window.location.origin}/dashboard`,
  });
};

export const handleLogout = () => {
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
};
