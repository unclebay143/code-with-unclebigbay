import { Assignment } from '@/models/assignment';
import { AssignmentResponse } from '@/models/assignmentResponse';
import { Course } from '@/models/course';
import { Question } from '@/models/question';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { _id: string } }) => {
  try {
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }
    await connectViaMongoose();

    const student = await Student.findOne({ email: session.user.email });
    const assignmentId = params._id;
    const studentId = student._id;

    const prevResponse = await AssignmentResponse.findOne({
      assignment: assignmentId,
      student: studentId,
    }).populate('course', '_id title', Course);

    if (prevResponse) {
      const assignment = { ...prevResponse.toJSON(), alreadyResponded: true };
      return NextResponse.json(
        { message: 'Assignment response fetched.', assignment },
        {
          status: 200,
        },
      );
    }

    const assignment = await Assignment.findOne({ _id: assignmentId })
      .select('_id course questions')
      .populate('course', '_id title', Course)
      .populate(
        'questions',
        '_id question options._id options.option',
        Question,
      );

    if (!assignment) {
      return NextResponse.json(
        { message: 'Assignment not found.', assignment },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Assignment fetched.', assignment },
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
