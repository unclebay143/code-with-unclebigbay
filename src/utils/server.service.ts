import { Audits } from '@/utils/types';
import { headers } from 'next/headers';
import { baseURL } from '../../frontend.config';
import { getServerSessionWithAuthOptions } from './auth-options';
import { Countries, Country, Hackathon, Student, Students } from './types';
import { Session } from 'next-auth';

export const getCustomHeaders = () => {
  const defaultHeaders = headers();
  const customHeaders = new Headers(defaultHeaders);

  return customHeaders;
};

export async function getCurrentStudent(): Promise<
  { student: Student } | undefined
> {
  try {
    const url = `${baseURL}/api/auth/student`;
    const result = await fetch(url, {
      headers: getCustomHeaders(),
      cache: 'force-cache',
    });
    const resultJson = await result.json();

    return { student: resultJson.student };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

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

export async function getAllActivityAudits(): Promise<
  { audits: Audits } | undefined
> {
  try {
    const url = `${baseURL}/api/audits`;
    const result = await fetch(url, {
      headers: getCustomHeaders(),
      cache: 'force-cache',
    });

    if (!result.ok) return undefined;
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
      headers: getCustomHeaders(),
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
      headers: getCustomHeaders(),
      cache: 'no-cache',
    });
    const leaderboard = await result.json();

    return leaderboard;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

export async function getEnrolledCourses(): Promise<
  { enrolledCourses: any } | undefined
> {
  try {
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
  } catch (error) {
    console.log({ error });
  }
}

export async function getAllHackathons() {
  try {
    const url = `${baseURL}/api/hackathons`; // isRegistered is derived from server
    const result = await fetch(url, {
      headers: getCustomHeaders(),
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
      headers: getCustomHeaders(),
      cache: 'force-cache',
    });

    const { hackathon } = await result.json();
    const hackathonId = hackathon._id;
    const isRegisteredUrl = `${baseURL}/api/hackathons/is-registered/${hackathonId}`;
    const hasSubmittedUrl = `${baseURL}/api/hackathons/has-submitted/${hackathonId}`;
    const isRegisteredResult = await fetch(isRegisteredUrl, {
      headers: getCustomHeaders(),
    });
    const hasSubmittedResult = await fetch(hasSubmittedUrl, {
      headers: getCustomHeaders(),
    });

    const { isRegistered } = await isRegisteredResult.json();
    const { hasSubmitted } = await hasSubmittedResult.json();
    return { hackathon, isRegistered, hasSubmitted };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

type GetCountriesResponse = {
  countries: Countries;
  sortedCountries: Countries;
};

export async function getCountries(): Promise<
  GetCountriesResponse | undefined
> {
  try {
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
  } catch (e: any) {
    console.log({ message: e.message });
  }
}
