import { Audits, Courses, LeaderBoard } from '@/utils/types';
import { cookies } from 'next/headers';
import { baseURL } from '../../frontend.config';
import { getServerSessionWithAuthOptions } from './auth-options';
import { Countries, Country, Hackathon, Student, Students } from './types';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { Student as StudentModel } from '@/models/student';
import { AuditTrail } from '@/models/audit-trail';
import connectViaMongoose from './mongoose';

// https://www.reddit.com/r/nextjs/comments/16hzdsr/i_have_a_question_using_headers/
// export const getCustomHeaders = () => {
//   const defaultHeaders = headers();
//   const customHeaders = new Headers(defaultHeaders);
//   return customHeaders;
// };

export const getCookie = async (name?: string) => {
  if (!name) return cookies().toString();

  return cookies().get(name)?.value.toString() ?? '';
};

export async function getCurrentStudent(): Promise<
  { student: Student } | undefined
> {
  const url = `${baseURL}/api/auth/student`;
  const result = await fetch(url, {
    headers: {
      Cookie: await getCookie(),
    },
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
    // const url = `${baseURL}/api/audits`;
    // const result = await fetch(url, {
    //   headers: {
    //     Cookie: await getCookie(),
    //   },
    //   cache: 'force-cache',
    // });

    // if (!result.ok) return { audits: [] };
    // const audits = await result.json();

    const session = await getServerSessionWithAuthOptions();

    // if (!session) {
    //   return NextResponse.json(
    //     { message: 'Session required' },
    //     { status: 403 },
    //   );
    // }
    await connectViaMongoose();
    const student = await StudentModel.findOne({ email: session?.user.email });

    const audits = await AuditTrail.find({ student: student.id }).sort({
      createdAt: -1,
    });

    // return NextResponse.json(
    //   { message: 'Student audits fetched', audits },
    //   { status: 200 },
    // );

    return { audits };
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
  try {
    const session = await getServerSessionWithAuthOptions();
    const url = `${baseURL}/api/hackathons/current-hackathon`;
    const result = await fetch(url, {
      cache: 'no-cache',
    });
    const { hackathon } = await result.json();

    return { hackathon: hackathon || null, session };
  } catch (error) {
    console.log(`Error from getCurrentHackathon Error:- ${error}`);
  }
}

type GetLeaderBoardResponse = {
  leaderboard: LeaderBoard;
  position: number;
};
export async function getLeaderBoard(): Promise<
  GetLeaderBoardResponse | undefined
> {
  const url = `${baseURL}/api/students/leaderboard`;

  const result = await fetch(url, {
    headers: { Cookie: await getCookie() },
    cache: 'no-cache',
  });
  const leaderboard = await result.json();

  return leaderboard;
}

export async function getCourses(): Promise<{ courses: Courses } | undefined> {
  const url = `${baseURL}/api/courses`;
  const result = await fetch(url, {
    cache: 'force-cache',
    headers: {
      Cookie: await getCookie(),
    },
  });

  if (!result.ok) {
    console.log(result.statusText);
  }

  const { courses } = await result.json();
  return { courses };
}

export async function getEnrolledCourses(): Promise<
  { enrolledCourses: any } | undefined
> {
  const url = `${baseURL}/api/courses/enroll`;
  const result = await fetch(url, {
    cache: 'force-cache',
    headers: {
      Cookie: await getCookie(),
    },
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
