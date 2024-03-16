import { Assignment } from '@/models/assignment';
import { Material } from '@/models/material';
import { Question } from '@/models/question';
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

    const _id = params._id;
    await connectViaMongoose();
    const assignment = await Assignment.findOne({ _id })
      .select('_id material questions')
      .populate('_id material', 'title', Material)
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
