import { Audits } from '@/utils/types';
import { headers } from 'next/headers';
import { baseURL } from '../../frontend.config';
import { getServerSessionWithAuthOptions } from './auth-options';
import { Countries, Country, Hackathon, Student, Students } from './types';
import { Session } from 'next-auth';
import { Student as StudentModel } from '@/models/student';
import { AuditTrail as AuditTrailModel } from '@/models/audit-trail';

// https://www.reddit.com/r/nextjs/comments/16hzdsr/i_have_a_question_using_headers/
export const getCustomHeaders = () => {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);
  return customHeaders;
};

export async function getCurrentStudent(): Promise<
  { student: Student } | undefined
> {
  const url = `${baseURL}/api/auth/student`;
  const result = await fetch(url, {
    headers: getCustomHeaders(),
    cache: 'force-cache',
  });
  const resultJson = await result.json();

  return { student: resultJson.student };
}

type GetCurrentStudentByUsernameResponse = {
  student: Student;
  canUpdateProfile: boolean;
  session: Session | null;
};

export async function getCurrentStudentByUsername(
  username: string,
): Promise<GetCurrentStudentByUsernameResponse | undefined> {
  const session = await getServerSessionWithAuthOptions();
  const url = `${baseURL}/api/students/${username}`;
  const result = await fetch(url, {
    cache: 'no-cache',
  });
  const { student } = await result.json();

  const canUpdateProfile = session?.user.email === student.email;

  if (!result.ok) return undefined;

  return { student, canUpdateProfile, session };
}

type GetStudentsResponse = { students: Students };
export async function getStudents(): Promise<GetStudentsResponse | undefined> {
  console.log('Running getStudents');

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
    console.log(`Error from getStudents Error:- ${error}`);
  }
}

type GetAllActivityAuditsResponse = { audits: Audits };
export async function getAllActivityAudits(): Promise<
  GetAllActivityAuditsResponse | undefined
> {
  try {
    const url = `${baseURL}/api/audits`;
    const result = await fetch(url, {
      headers: new Headers(headers()),
      cache: 'force-cache',
    });

    if (!result.ok) return { audits: [] };
    const audits = await result.json();

    return audits;

    // const session = await getServerSessionWithAuthOptions();
    // const student = await StudentModel.findOne({ email: session?.user.email });
    // const audits = await AuditTrailModel.find({ student: student.id }).sort({
    //   createdAt: -1,
    // });

    // return { audits: JSON.parse(JSON.stringify(audits)) };
  } catch (error) {
    console.log(`Error from getAllActivityAudits: Error:- ${error}`);
  }
}

type GetCurrentHackathonResponse = {
  hackathon: Hackathon;
  session: Session | null;
};

export async function getCurrentHackathon(): Promise<
  GetCurrentHackathonResponse | undefined
> {
  console.log('Running getCurrentHackathon');
  try {
    const session = await getServerSessionWithAuthOptions();
    const url = `${baseURL}/api/hackathons/current-hackathon`;
    const result = await fetch(url, {
      cache: 'no-cache',
    });
    const { hackathon } = await result.json();

    if (!hackathon) return undefined;
    return { hackathon, session };
  } catch (error) {
    console.log(`Error from getCurrentHackathon Error:- ${error}`);
  }
}

export async function getLeaderBoard() {
  const url = `${baseURL}/api/students/leaderboard`;
  const result = await fetch(url, {
    headers: getCustomHeaders(),
    cache: 'no-cache',
  });
  const leaderboard = await result.json();

  return leaderboard;
}

export async function getEnrolledCourses(): Promise<
  { enrolledCourses: any } | undefined
> {
  const url = `${baseURL}/api/courses/enroll`;
  const result = await fetch(url, {
    cache: 'force-cache',
    headers: getCustomHeaders(),
  });

  if (!result.ok) {
    console.log(result.statusText);
  }

  const { enrolledCourses } = await result.json();
  return { enrolledCourses };
}

export async function getAllHackathons() {
  const url = `${baseURL}/api/hackathons`; // isRegistered is derived from server
  const result = await fetch(url, {
    cache: 'force-cache',
  });
  const hackathons = await result.json();

  return hackathons;
}

export async function getHackathonBySlug(hackathonSlug: string) {
  const url = `${baseURL}/api/hackathons/${hackathonSlug}`;

  const result = await fetch(url, {
    cache: 'force-cache',
  });

  const { hackathon } = await result.json();

  if (!hackathon) return null;

  const hackathonId = hackathon._id;

  const isRegisteredUrl = `${baseURL}/api/hackathons/is-registered/${hackathonId}`;
  const hasSubmittedUrl = `${baseURL}/api/hackathons/has-submitted/${hackathonId}`;

  const isRegisteredResult = await fetch(isRegisteredUrl);

  const hasSubmittedResult = await fetch(hasSubmittedUrl);

  const { isRegistered } = await isRegisteredResult.json();
  const { hasSubmitted } = await hasSubmittedResult.json();
  return { hackathon, isRegistered, hasSubmitted };
}

type GetCountriesResponse = {
  countries: Countries;
  sortedCountries: Countries;
};

export async function getCountries(): Promise<
  GetCountriesResponse | undefined
> {
  const url = 'https://restcountries.com/v3.1/all?fields=name';

  const result = await fetch(url, {
    cache: 'force-cache',
  });

  if (!result.ok) return undefined;

  const countries = await result.json();
  const sortedCountries = countries.sort((a: Country, b: Country) =>
    a.name.common.localeCompare(b.name.common),
  );

  return { countries, sortedCountries };
}
