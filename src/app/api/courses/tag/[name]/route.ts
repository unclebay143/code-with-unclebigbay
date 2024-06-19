import { Course } from '@/models/course';
import { Enroll } from '@/models/enroll';
import { Student } from '@/models/student';
import { Tag } from '@/models/tag';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { name: string } }) => {
  try {
    let courses;
    let tag;
    const courseTagName = params.name.toLowerCase();
    await connectViaMongoose();

    tag = await Tag.findOne({ name: courseTagName });
    const tagNotFound = !tag;

    if (tagNotFound) {
      return NextResponse.json(
        { message: 'Tag not found.', courses: [] },
        {
          status: 404,
        },
      );
    }

    const tagId = tag._id;

    courses = await Course.find({
      isActive: true,
      tags: { $in: tagId },
    })
      .sort({
        createdAt: -1,
      })
      .populate('tags', '', Tag);

    const noCourseFound = courses.length === 0;

    if (noCourseFound) {
      return NextResponse.json(
        { message: 'No course found for the tag.', courses: [] },
        {
          status: 404,
        },
      );
    }

    const session = await getServerSessionWithAuthOptions();
    const noSession = !session;
    if (noSession) {
      return NextResponse.json(
        { message: 'Courses fetched for no session.', courses },
        { status: 200 },
      );
    }

    const student = await Student.findOne({ email: session?.user.email });

    const enrolledCourses = await Enroll.find({
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

    return NextResponse.json(
      { message: 'Courses fetched.', courses },
      { status: 200 },
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
