import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import connectViaMongoose from './mongoose';
import { Student } from '@/models/student';
import { AuditTrail } from '@/models/audit-trail';

function getUsernameFromEmail(email: string) {
  if (!email || typeof email !== 'string') {
    return null; // Handle invalid input
  }

  const parts = email.split('@');
  if (parts.length < 1) {
    return null; // Handle empty email or missing "@" symbol
  }

  return parts[0]; // Return the entire username before "@"
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile: studentUserProfile, account }) {
      await connectViaMongoose();
      const isGitHubAuthProvider = account?.provider === 'github';
      const isGoogleAuthProvider = account?.provider === 'google';

      const student = await Student.findOne({
        email: studentUserProfile?.email,
      });

      const isNewStudent = !student;

      if (isNewStudent) {
        let newStudentData;
        if (isGitHubAuthProvider) {
          newStudentData = {
            fullName: studentUserProfile?.name,
            email: studentUserProfile?.email,
            username: studentUserProfile?.login,
            bio: studentUserProfile?.bio,
            photo: studentUserProfile?.avatar_url,
            authProvider: 'github',
          };
        }

        if (isGoogleAuthProvider) {
          newStudentData = {
            fullName:
              studentUserProfile?.name || studentUserProfile?.given_name,
            email: studentUserProfile?.email,
            username: getUsernameFromEmail(studentUserProfile?.email!),
            bio: '',
            photo: studentUserProfile?.picture,
            authProvider: 'google',
          };
        }

        const newStudentCreated = await Student.create(newStudentData);
        if (newStudentCreated) {
          const studentId = newStudentCreated._id;
          await AuditTrail.create({
            type: 'onboarding',
            student: studentId,
            title: 'Created an account 🎉',
          });
        }

        return true;
      }

      await AuditTrail.create({
        student: student._id,
        title: 'Logged in',
      });
      return true;
    },
  },
} satisfies NextAuthOptions;

// https://next-auth.js.org/configuration/nextjs#getserversession
export function getServerSessionWithAuthOptions(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
