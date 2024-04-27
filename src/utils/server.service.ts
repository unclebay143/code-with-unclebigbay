import { headers } from 'next/headers';
import { baseURL } from '../../frontend.config';
import { getServerSessionWithAuthOptions } from './auth-options';

export async function getCurrentStudent(username: string) {
  try {
    const session = await getServerSessionWithAuthOptions();
    const url = `${baseURL}/api/students/${username}`;
    const result = await fetch(url, {
      cache: 'no-cache',
    });
    const studentRes = await result.json();

    const canUpdateProfile = session?.user.email === studentRes.student.email;

    if (!result.ok) return undefined;

    return { studentRes, canUpdateProfile, session };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

export async function getStudents() {
  try {
    const url = `${baseURL}/api/students`;
    const result = await fetch(url, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      console.log(result.statusText);
      return [];
    }

    return result.json();
  } catch (error) {
    console.log({ error });
  }
}

export async function getAllActivityAudits() {
  try {
    const url = `${baseURL}/api/audits`;
    const result = await fetch(url, {
      headers: headers(),
    });
    const audits = await result.json();
    return audits;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

export async function getCurrentHackathon() {
  try {
    const session = await getServerSessionWithAuthOptions();

    const url = `${baseURL}/api/hackathons/current-hackathon`;
    const result = await fetch(url, {
      headers: headers(),
    });
    const hackathonRes = await result.json();

    return { hackathon: hackathonRes.hackathon, session };
  } catch (e: any) {
    console.log({ message: e.message });
  }
}
