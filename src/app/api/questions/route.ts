import { NextResponse } from 'next/server';
import connectViaMongoose from '@/utils/mongoose';
import { Question } from '@/models/question';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Student } from '@/models/student';
import { Student as StudentType } from '@/utils/types';

const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    await connectViaMongoose();
    const questionAlreadyExist = await Question.findOne({
      question: body.question,
    });

    if (questionAlreadyExist) {
      return NextResponse.json(
        { message: 'Questions already exist', questionAlreadyExist },
        {
          status: 409,
        },
      );
    }

    const newQuestion = await Question.create(body);
    return NextResponse.json(
      { message: 'Question created', newQuestion },
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

const GET = async () => {
  try {
    await connectViaMongoose();
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'No valid session' },
        {
          status: 404,
        },
      );
    }
    const student: StudentType | null = await Student.findOne({
      email: session.user.email,
    });

    const isAdmin = student?.isAdmin;
    const questions = await Question.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select(
        `_id question options.option options._id answerExplanation createdAt tags ${isAdmin && 'options.isCorrect'}`,
      )
      .populate('tags');
    return NextResponse.json(
      { message: 'Questions fetched successfully', questions },
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

const PATCH = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    await connectViaMongoose();
    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: body._id },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updatedQuestion) {
      return NextResponse.json(
        { message: 'Question not found' },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Question updated', updatedQuestion },
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

const DELETE = async (req: Request, res: Response) => {
  const body = await req.json();
  try {
    await connectViaMongoose();
    await Question.findOneAndUpdate(
      { _id: body._id },
      { $set: { isActive: false } },
      { new: true },
    );
    return NextResponse.json(
      { message: 'Question deleted' },
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

export { POST, GET, PATCH, DELETE };
