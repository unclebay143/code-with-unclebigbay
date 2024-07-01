import { Session, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
  }

  interface Profile {
    id: string;

    // github
    bio: string;
    login: string;
    location: string;
    avatar_url: string;

    // Google
    given_name: string;
    picture: string;
  }
}
