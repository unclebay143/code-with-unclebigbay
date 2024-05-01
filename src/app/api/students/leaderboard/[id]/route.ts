import { LeaderBoard } from '@/models/leader-board';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    await connectViaMongoose();
    const session = await getServerSessionWithAuthOptions();

    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }
    const currentStudent = await Student.findOne({
      email: session.user.email,
    });

    const studentLeaderBoard = await LeaderBoard.findOne({
      student: currentStudent._id,
    });

    return NextResponse.json(
      {
        message: 'Student total score fetched.',
        studentLeaderBoard,
      },
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
