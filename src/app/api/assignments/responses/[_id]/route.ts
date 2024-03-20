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

    const assignmentResponse = await AssignmentResponse.findOne({
      student: studentId,
      assignment: assignmentId,
    })
      .populate(
        'response.question',
        'question answerExplanation options.option options._id options.isCorrect status grade score',
        Question,
      )
      .populate('course', 'title', Course);

    if (!assignmentResponse) {
      return NextResponse.json(
        { message: 'Assignment Response not found.', assignmentResponse },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Assignment response fetched.', assignmentResponse },
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
