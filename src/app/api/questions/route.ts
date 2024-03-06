import { NextResponse } from 'next/server';
import connectViaMongoose from '@/utils/mongoose';
import { Question } from '@/models/question';

// {
//   "question": "Is java a programming language?",
//   "options": [
//     {
//       "option": "yes",
//       "isCorrect": true
//     },
//     {
//       "option": "no",
//     }
//   ],
//   "answerExplanation": "HTML is not a programming language"
// }

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
    const questions = await Question.find({}).select(
      '_id question options.option options._id answerExplanation',
    );
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

// const updatePayload = {
//   _id: '65e824d55d931c34b12b8a30',
//   title: 'updated_title',
//   'options.0.label': 'updated_option_label_1', // Update the first option label
//   'options.0.isCorrect': true, // Update the first option isCorrect value
//   answerExplanation: 'updated_answer_explanation',
// };

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
    await Question.deleteOne({ _id: body._id });
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
