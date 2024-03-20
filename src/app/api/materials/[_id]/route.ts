import { Material } from '@/models/material';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { _id: string } }) => {
  try {
    const _id = params._id;
    await connectViaMongoose();
    let material = await Material.findOne({ _id }).populate('tags');

    if (!material) {
      return NextResponse.json(
        { message: 'Material not found.', material },
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

      const materialWithEnrollmentStatus = student.enrolledCourses.map(
        (enrolledCourse: any) => {
          const isEnrolled = enrolledCourse.course.toString() === _id;
          const enrollmentData = isEnrolled
            ? { isEnrolled, enrolledDate: enrolledCourse.enrolledDate }
            : null;
          return { ...material.toJSON(), ...enrollmentData };
        },
      );

      material = materialWithEnrollmentStatus[0];
      return NextResponse.json(
        { message: 'Material fetched.', material },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { message: 'Material fetched.', material },
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
