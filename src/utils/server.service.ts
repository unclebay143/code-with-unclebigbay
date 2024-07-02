import { Audits, Courses, LeaderBoard, Quote } from '@/utils/types';
import { cookies } from 'next/headers';
import { baseURL } from '../../frontend.config';
import { getServerSessionWithAuthOptions } from './auth-options';
import { Countries, Country, Hackathon, Student, Students } from './types';
import { Session } from 'next-auth';
import { getCookie as customCookie } from 'cookies-next';
import { Student as StudentModel } from '@/models/student';
import { AuditTrail } from '@/models/audit-trail';
import connectViaMongoose from './mongoose';
import { HackathonRegistration as HackathonRegistrationModel } from '@/models/hackathonRegistration';
import { HackathonSubmission as HackathonSubmissionModel } from '@/models/hackathonSubmission';
import { Enroll as EnrollModel } from '@/models/enroll';
import { Course as CourseModel } from '@/models/course';
import { Tag as TagModel } from '@/models/tag';
import { Hackathon as HackathonModel } from '@/models/hackathon';

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

/* 
@usecase: to fetch currently logged in user/student profile
*/
export async function getCurrentStudent(): Promise<
  { student: Student } | undefined
> {
  try {
    const session = await getServerSessionWithAuthOptions();
    if (!session) return undefined;

    await connectViaMongoose();
    const student = await StudentModel.findOne({ email: session.user.email });
    return { student: JSON.parse(JSON.stringify(student)) };
  } catch (error) {
    console.log('Error from getCurrentStudent:', error);
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
      // cache: 'no-cache',
      cache: 'force-cache',
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

    return { audits: JSON.parse(JSON.stringify(audits)) };
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
      cache: 'no-store',
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
  // const url = `${baseURL}/api/courses`;
  // const result = await fetch(url, {
  //   cache: 'force-cache',
  //   headers: {
  //     Cookie: await getCookie(),
  //   },
  // });

  // if (!result.ok) {
  //   console.log(result.statusText);
  // }

  // const { courses } = await result.json();
  // return { courses };

  let courses;
  await connectViaMongoose();

  courses = await CourseModel.find({ isActive: true })
    .sort({
      createdAt: -1,
    })
    .populate('tags', '', TagModel);

  const session = await getServerSessionWithAuthOptions();

  if (!session) {
    return { courses: JSON.parse(JSON.stringify(courses)) };
  }

  const student = await StudentModel.findOne({ email: session?.user.email });
  const userStack = student.stack || 'platform-guide';
  const userHasStack = session && userStack;
  const isFullStack = student.stack === 'full-stack';

  if (userHasStack && !isFullStack) {
    const tag = await TagModel.findOne({ name: { $in: userStack } });

    if (!tag) return { courses: [] };

    if (tag) {
      courses = await CourseModel.find({
        isActive: true,
        tags: { $in: tag._id },
      })
        .sort({
          createdAt: -1,
        })
        .populate('tags', '', TagModel);
    }
  }

  const enrolledCourses = await EnrollModel.find({
    student: student._id,
  });

  if (enrolledCourses) {
    const courseIdsEnrolled = enrolledCourses.map(
      (enrolledCourse) => enrolledCourse.course._id,
    );

    courses = courses?.map((course) => {
      const isEnrolled = courseIdsEnrolled.some(
        (courseId) => courseId.toString() === course._id.toString(),
      );

      return {
        ...course.toJSON(),
        isEnrolled,
      };
    });
  }

  return { courses: JSON.parse(JSON.stringify(courses)) };
}

export async function getEnrolledCourses(): Promise<
  { enrolledCourses: any } | undefined
> {
  // const url = `${baseURL}/api/courses/enroll`;
  // const result = await fetch(url, {
  //   cache: 'force-cache',
  //   headers: {
  //     Cookie: await getCookie(),
  //   },
  // });

  // if (!result.ok) {
  //   console.log(result.statusText);
  // }

  // const { enrolledCourses } = await result.json();
  // return { enrolledCourses };

  const session = await getServerSessionWithAuthOptions();

  if (!session) return undefined;

  await connectViaMongoose();
  let student = await StudentModel.findOne({
    email: session.user.email,
  });

  const enrolledCourses = await EnrollModel.find({
    student: student._id,
  })
    .populate('course', '', CourseModel)
    .sort({
      createdAt: -1,
    });

  return { enrolledCourses: JSON.parse(JSON.stringify(enrolledCourses)) };
}

export async function getAllHackathons() {
  // const url = `${baseURL}/api/hackathons`; // isRegistered is derived from server
  // const result = await fetch(url, {
  //   headers: {
  //     Cookie: await getCookie(),
  //   },
  //   cache: 'no-store',
  // });
  // const hackathons = await result.json();
  const session = await getServerSessionWithAuthOptions();
  await connectViaMongoose();

  let student;

  if (session) {
    student = await StudentModel.findOne({ email: session.user.email });
  }

  const hackathons = await HackathonModel.aggregate([
    {
      $lookup: {
        from: 'hackathonRegistrations',
        localField: '_id',
        foreignField: 'hackathon',
        as: 'participants',
      },
    },
    {
      $addFields: {
        participantCount: { $size: '$participants' },
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by createdAt in descending order (newest first)
    },
    {
      $project: {
        _id: 1,
        title: 1,
        startDate: 1,
        endDate: 1,
        coverImage: 1,
        desktopCoverImage: 1,
        tags: 1,
        brief: 1,
        isActive: 1,
        status: 1,
        slug: 1,
        participantCount: 1,
        ...(student && {
          isRegistered: { $gt: [{ $size: '$participants' }, 0] },
        }), // Check if participants exist
      },
    },
  ]);

  return { hackathons: JSON.parse(JSON.stringify(hackathons)) };
}

export async function isRegisteredForHackathon(hackathonId: string) {
  const session = await getServerSessionWithAuthOptions();
  await connectViaMongoose();

  if (!session) return false;

  const student = await StudentModel.findOne({ email: session.user.email });
  const studentId = student._id;

  const count = await HackathonRegistrationModel.countDocuments({
    hackathon: hackathonId,
    student: studentId,
  });
  const isRegistered = count > 0;

  return isRegistered;
}
export async function hasSubmittedHackathonEntry(hackathonId: string) {
  const session = await getServerSessionWithAuthOptions();
  await connectViaMongoose();

  if (!session) return false;

  const student = await StudentModel.findOne({ email: session.user.email });
  const studentId = student._id;

  const count = await HackathonSubmissionModel.countDocuments({
    hackathon: hackathonId,
    student: studentId,
  });
  const hasSubmitted = count > 0;

  return hasSubmitted;
}

export async function getHackathonBySlug(hackathonSlug: string) {
  const url = `${baseURL}/api/hackathons/${hackathonSlug}`;

  const result = await fetch(url, { next: { revalidate: 3 } }); // 3s cache

  const { hackathon } = await result.json();

  if (!hackathon) return null;

  const hackathonId = hackathon._id;
  const isRegistered = await isRegisteredForHackathon(hackathonId);
  const hasSubmitted = await hasSubmittedHackathonEntry(hackathonId);
  return { hackathon, isRegistered, hasSubmitted };
}

type GetCountriesResponse = {
  countries: Countries;
  sortedCountries: Countries;
};

export async function getCountries(): Promise<
  GetCountriesResponse | undefined
> {
  // const url = 'https://restcountries.com/v3.1/all?fields=name';

  // const result = await fetch(url, {
  //   cache: 'force-cache',
  // });

  // if (!result.ok) return undefined;

  // const countries = await result.json();

  const countries = [
    { name: { common: 'Nigeria' } },
    { name: { common: 'South Africa' } },
    { name: { common: 'India' } },
    { name: { common: 'Ghana' } },
    { name: { common: 'Brazil' } },
    { name: { common: 'Canada' } },
    { name: { common: 'United Kingdom' } },
    { name: { common: 'United States' } },
    { name: { common: 'Germany' } },
  ];

  const sortedCountries = countries.sort((a: Country, b: Country) =>
    a.name.common.localeCompare(b.name.common),
  );

  return {
    countries,
    sortedCountries,
  };
}

export async function getQuote(): Promise<Quote | undefined> {
  try {
    const url = `${baseURL}/api/quote`;
    const result = await fetch(url, {
      cache: 'no-store',
    });

    if (!result) return undefined;

    const { quote } = await result.json();

    return quote;
  } catch (error) {
    console.log(`Error from getRandomQuote Error:- ${error}`);
  }
}

type QuoteWidgetPref = { closedTime: number };
export const widgetVisibility = () => {
  const quoteWidgetPrefCookie = customCookie('quoteWidgetPref', { cookies });
  const quoteWidgetPref =
    quoteWidgetPrefCookie &&
    (JSON.parse(quoteWidgetPrefCookie) as QuoteWidgetPref);
  const hasClosedWidgetPreviously = !!quoteWidgetPref;
  let showWidget = false;

  if (hasClosedWidgetPreviously) {
    const getCurrentDate = new Date().getMilliseconds();
    const aDayCheck =
      (getCurrentDate - quoteWidgetPref.closedTime) / (1000 * 60 * 60);

    const aYearCheck =
      (getCurrentDate - quoteWidgetPref.closedTime) / (1000 * 60 * 60);

    if (aDayCheck >= 24 || aYearCheck >= 365) {
      showWidget = true;
      return showWidget;
    }

    showWidget = false;
  } else {
    showWidget = true;
  }

  return showWidget;
};
