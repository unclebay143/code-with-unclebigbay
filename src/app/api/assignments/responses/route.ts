import { Question } from '@/models/question';
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

    const questions = await Question.find({ _id: { $in: questionIds } });

    // Update each response object with isCorrect field
    const updatedResponse = assignmentResponseBody.response.map(
      (response: any) => {
        const question = questions.find(
          (q) => q._id.toString() === response.question,
        );
        const isCorrect = question
          ? question.answer === response.answer
          : false;
        return { ...response, isCorrect };
      },
    );

    const score = updatedResponse.filter(
      (response: any) => response.isCorrect,
    ).length;

    console.log(updatedResponse);
    console.log(score);

    const payload = { ...updatedResponse, score };
    return NextResponse.json(
      { message: 'Assignment response fetched.', payload },
      {
        status: 200,
      },
    );

    // const payload = {
    //   ...body,
    // };
    // const newResponse = AssignmentResponse.create(body);

    await connectViaMongoose();
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { POST };
