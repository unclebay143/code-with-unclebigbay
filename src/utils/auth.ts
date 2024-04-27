import { signIn, signOut } from 'next-auth/react';

export const handleAuthentication = (props: { nextUrl?: string } = {}) => {
  signIn('github', {
    callbackUrl: props.nextUrl || `${window.location.origin}/dashboard`,
  });
};

export const handleLogout = () => {
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
};
