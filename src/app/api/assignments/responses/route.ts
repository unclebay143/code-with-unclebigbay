import { AssignmentResponse } from '@/models/assignmentResponse';
import { Question } from '@/models/question';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request) => {
  try {
    const assignmentResponseBody = await req.json();

    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }

    const questionIds = assignmentResponseBody.response.map(
      (response: any) => response.question,
    );

    await connectViaMongoose();
    const questions = await Question.find({ _id: { $in: questionIds } });
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    let grade;
    let status = 'passed';

    // Update each response object with isCorrect field
    const updatedResponse = assignmentResponseBody.response.map(
      (response: any) => {
        const question = questions.find(
          (q) => q._id.toString() === response.question,
        );
        const correctOption = question.options.find((o: any) => o.isCorrect);
        const isCorrect = correctOption.option === response.answer;
        if (isCorrect) {
          correctAnswers++;
        }
        return { ...response, isCorrect };
      },
    );

    const score = (correctAnswers / totalQuestions) * 100;

    if (score >= 75) {
      grade = 'A';
    } else if (score >= 70) {
      grade = 'B';
    } else if (score >= 50) {
      grade = 'C';
    } else if (score >= 45) {
      grade = 'D';
      status = 'failed';
    } else if (score >= 40) {
      grade = 'E';
      status = 'failed';
    } else {
      grade = 'F';
      status = 'failed';
    }

    const payload = {
      ...assignmentResponseBody,
      response: updatedResponse,
      score,
      grade,
      status,
    };

    const newAssignmentResponse = await AssignmentResponse.create(payload);
    const updateStudentAssignmentsRecord = await Student.findOneAndUpdate(
      { _id: assignmentResponseBody.student },
      { $push: { assignment: assignmentResponseBody.assignment } },
      { new: true },
    );
    await updateStudentAssignmentsRecord.save();

    return NextResponse.json(
      { message: 'Assignment response recorded.', newAssignmentResponse },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { POST };
