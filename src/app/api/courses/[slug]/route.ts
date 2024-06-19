import { AssignmentResponse } from '@/models/assignmentResponse';
import { Course } from '@/models/course';
import { Enroll } from '@/models/enroll';
import { Student } from '@/models/student';
import { Tag } from '@/models/tag';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { slug: string } }) => {
  try {
    const courseSlug = params.slug;
    await connectViaMongoose();

    let course = await Course.findOne({ slug: courseSlug }).populate(
      'tags',
      '_id name slug logo',
      Tag,
    );
    if (!course) {
      return NextResponse.json(
        { message: 'Course not found.', course },
        {
          status: 404,
        },
      );
    }

    const courseId = course._id;

    const enrolledStudentsCount = await Enroll.countDocuments({
      course: courseId,
    });

    const session = await getServerSessionWithAuthOptions();
    if (session) {
      const student = await Student.findOne({ email: session.user.email });
      const studentId = student._id;
      const hasAssignmentResponse = await AssignmentResponse.find({
        student: studentId,
        course: courseId,
      });

      const enrollmentData = await Enroll.findOne({
        student: studentId,
        course: courseId,
      });

      const isEnrolled = !!enrollmentData;
      const hasAttemptedAssignment = !!hasAssignmentResponse;

      if (isEnrolled) {
        const courseWithEnrollmentStatus = {
          ...course.toJSON(),
          ...enrollmentData.toJSON(),
          isEnrolled,
          hasAttemptedAssignment,
          enrolledStudentsCount,
        };
        course = courseWithEnrollmentStatus;
        return NextResponse.json(
          { message: 'Course fetched.', course },
          {
            status: 200,
          },
        );
      }
    }

    course = {
      ...course.toJSON(),
      enrolledStudentsCount,
    };
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
