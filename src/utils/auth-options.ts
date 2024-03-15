import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import connectViaMongoose from './mongoose';
import { Student } from '@/models/student';
import { AuditTrail } from '@/models/audit-trail';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ profile: studentUserProfile }) {
      await connectViaMongoose();
      const student = await Student.findOne({
        email: studentUserProfile?.email,
      });

      if (!student) {
        const newStudent = {
          fullName: studentUserProfile?.name,
          email: studentUserProfile?.email,
          username: studentUserProfile?.login,
          bio: studentUserProfile?.bio,
          photo: studentUserProfile?.avatar_url,
        };

        const student = await Student.create(newStudent);
        // if (student) {
        //   const studentId = student._id;
        //   await AuditTrail.create({
        //     student: studentId,
        //     title: 'Created an account',
        //   });
        // }
        return true;
      }

      // await AuditTrail.create({
      //   student: student._id,
      //   title: 'Logged in',
      // });

      return true;
    },
  },
} satisfies NextAuthOptions;

export function getServerSessionWithAuthOptions(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
