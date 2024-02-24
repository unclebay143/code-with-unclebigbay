import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import connectViaMongoose from './mongoose';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export const authOptions = {
  // adapter: MongoDBAdapter(connectViaMongoose),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log({ user });
      console.log({ profile });
      console.log({ account });
      return true;
      // const response = await fetch('/auth/studentExists', {
      //   email: profile?.email,
      // });
      // if (response && response.data?.value === true) {
      //   return true;
      // } else {
      //   console.log(profile);
      //   return true;
      // }
    },
  },
} satisfies NextAuthOptions;
