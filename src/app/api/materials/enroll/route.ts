import { Assignment } from '@/models/assignment';
import { Material } from '@/models/material';
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
    const enrolledCourses = await Student.findOne({
      email: session?.user.email,
    })
      .select('enrolledCourses')
      .populate('enrolledCourses');

    const data = { student: enrolledCourses };
    return NextResponse.json(
      { message: 'Enrolled Courses fetched.', data },
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
    const course = await Material.findById(courseId);
    const student = await Student.findById(studentId);

    if (!course || !student) {
      return NextResponse.json(
        { message: 'Course or Student not found' },
        { status: 404 },
      );
    }

    course.enrolledStudents.push({ student: studentId });
    await course.save();

    student.enrolledCourses.push({ course: courseId });
    await student.save();

    return NextResponse.json({ message: 'Student enrolled.' }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { GET, POST };
