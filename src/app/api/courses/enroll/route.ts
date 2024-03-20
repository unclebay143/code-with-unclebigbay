import { AuditTrail } from '@/models/audit-trail';
import { Enroll } from '@/models/enroll';
import { Course } from '@/models/course';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }
    await connectViaMongoose();
    let courses = await Student.findOne({
      email: session?.user.email,
    })
      .select('enrolledCourses')
      .populate('enrolledCourses.course');

    return NextResponse.json(
      { message: 'Enrolled Courses fetched.', courses },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { courseId, studentId } = body;

    if (!courseId || !studentId) {
      return NextResponse.json(
        { message: 'courseId and studentId are required' },
        { status: 404 },
      );
    }

    await connectViaMongoose();
    const course = await Course.findById(courseId);
    const student = await Student.findById(studentId);

    if (!course || !student) {
      return NextResponse.json(
        { message: 'Course or Student not found' },
        { status: 404 },
      );
    }

    // await Enroll.create({
    //   student: studentId,
    //   course: courseId,
    // });

    course.enrolledStudents.push({ student: studentId });
    await course.save();

    student.enrolledCourses.push({ course: courseId });
    await student.save();

    console.log(course.title);

    await AuditTrail.create({
      student: studentId,
      title: 'Course',
      description: `Started "${course.title}"`,
    });

    return NextResponse.json({ message: 'Student enrolled.' }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { GET, POST };
