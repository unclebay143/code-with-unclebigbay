import { Course } from '@/models/course';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { _id: string } }) => {
  try {
    const _id = params._id;
    await connectViaMongoose();
    let course = await Course.findOne({ _id }).populate('tags');

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found.', course },
        {
          status: 404,
        },
      );
    }

    const session = await getServerSessionWithAuthOptions();
    if (session) {
      const student = await Student.findOne({ email: session.user.email })
        .select('enrolledCourses')
        .populate('enrolledCourses');

      const courseWithEnrollmentStatus = student.enrolledCourses.map(
        (enrolledCourse: any) => {
          const isEnrolled = enrolledCourse.course.toString() === _id;
          const enrollmentData = isEnrolled
            ? { isEnrolled, enrolledDate: enrolledCourse.enrolledDate }
            : null;
          return { ...course.toJSON(), ...enrollmentData };
        },
      );

      course = courseWithEnrollmentStatus[0];
      return NextResponse.json(
        { message: 'Course fetched.', course },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { message: 'Course fetched.', course },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      {
        status: 500,
      },
    );
  }
};

export { GET };
