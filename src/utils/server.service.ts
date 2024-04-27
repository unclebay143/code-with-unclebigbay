import { headers } from 'next/headers';
import { baseURL } from '../../frontend.config';
import { getServerSessionWithAuthOptions } from './auth-options';
import { Hackathon, Student, Students } from './types';
import { Session } from 'next-auth';

type GetCurrentStudentByUsernameResponse = {
  student: Student;
  canUpdateProfile: boolean;
  session: Session | null;
};

export async function getCurrentStudentByUsername(
  username: string,
): Promise<GetCurrentStudentByUsernameResponse | undefined> {
  try {
    const session = await getServerSessionWithAuthOptions();
    const url = `${baseURL}/api/students/${username}`;
    const result = await fetch(url, {
      cache: 'no-cache',
    });
    const { student } = await result.json();

    const canUpdateProfile = session?.user.email === student.email;

    if (!result.ok) return undefined;

    return { student, canUpdateProfile, session };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

type GetStudentsResponse = { students: Students };
export async function getStudents(): Promise<GetStudentsResponse | undefined> {
  try {
    const url = `${baseURL}/api/students`;
    const result = await fetch(url, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) return undefined;

    const students = await result.json();
    return students;
  } catch (error) {
    console.log({ error });
  }
}

export async function getAllActivityAudits() {
  try {
    const url = `${baseURL}/api/audits`;
    const result = await fetch(url, {
      headers: headers(),
      cache: 'force-cache',
    });
    const audits = await result.json();
    return audits;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

type GetCurrentHackathonResponse = {
  hackathon: Hackathon;
  session: Session | null;
};

export async function getCurrentHackathon(): Promise<
  GetCurrentHackathonResponse | undefined
> {
  try {
    const session = await getServerSessionWithAuthOptions();
    const url = `${baseURL}/api/hackathons/current-hackathon`;
    const result = await fetch(url, {
      headers: headers(),
      cache: 'force-cache',
    });
    const { hackathon } = await result.json();

    if (!hackathon) return undefined;

    return { hackathon, session };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

export async function getLeaderBoard() {
  try {
    const url = `${baseURL}/api/students/leaderboard`;
    const result = await fetch(url, {
      headers: headers(),
      cache: 'no-cache',
    });
    const leaderboard = await result.json();

    return leaderboard;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

export async function getEnrolledCourses() {
  try {
    const url = `${baseURL}/api/courses/enroll`;
    const result = await fetch(url, {
      cache: 'force-cache',
      headers: headers(),
    });

    if (!result.ok) {
      console.log(result.statusText);
    }

    return result.json();
  } catch (error) {
    console.log({ error });
  }
}

export async function getAllHackathons() {
  try {
    const url = `${baseURL}/api/hackathons`; // isRegistered is derived from server
    const result = await fetch(url, {
      headers: headers(),
      cache: 'force-cache',
    });
    const hackathons = await result.json();

    return hackathons;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

export async function getHackathonBySlug(hackathonSlug: string) {
  try {
    const url = `${baseURL}/api/hackathons/${hackathonSlug}`;
    const result = await fetch(url, {
      headers: headers(),
      cache: 'force-cache',
    });

    const { hackathon } = await result.json();
    const hackathonId = hackathon._id;
    const isRegisteredUrl = `${baseURL}/api/hackathons/is-registered/${hackathonId}`;
    const hasSubmittedUrl = `${baseURL}/api/hackathons/has-submitted/${hackathonId}`;
    const isRegisteredResult = await fetch(isRegisteredUrl, {
      headers: headers(),
    });
    const hasSubmittedResult = await fetch(hasSubmittedUrl, {
      headers: headers(),
    });

    const { isRegistered } = await isRegisteredResult.json();
    const { hasSubmitted } = await hasSubmittedResult.json();
    return { hackathon, isRegistered, hasSubmitted };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}
