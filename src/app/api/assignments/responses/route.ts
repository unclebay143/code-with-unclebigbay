import { AssignmentResponse } from '@/models/assignmentResponse';
import { AuditTrail } from '@/models/audit-trail';
import { Course } from '@/models/course';
import { Enroll } from '@/models/enroll';
import { Question } from '@/models/question';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request) => {
  try {
    const assignmentResponseBody = await req.json();
    const courseId = assignmentResponseBody.course;
    const studentId = assignmentResponseBody.student;

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
    let score = 0;
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
          score++;
        }
        return { ...response, isCorrect };
      },
    );
    const scoreInPercentage = (score / totalQuestions) * 100;

    if (scoreInPercentage >= 75) {
      grade = 'A';
    } else if (scoreInPercentage >= 70) {
      grade = 'B';
    } else if (scoreInPercentage >= 50) {
      grade = 'C';
    } else if (scoreInPercentage >= 45) {
      grade = 'D';
      status = 'failed';
    } else if (scoreInPercentage >= 40) {
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

    const course = await Course.findOne({
      _id: courseId,
    });

    await Enroll.findOneAndUpdate(
      { course: courseId, student: studentId },
      {
        isCompleted: true,
        completionDate: Date.now(),
      },
    );

    await AuditTrail.create({
      student: studentId,
      title: 'Assignment Submission 🙌🏾',
      description: `You submitted an assignment for "${course.title}"`,
    });

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
