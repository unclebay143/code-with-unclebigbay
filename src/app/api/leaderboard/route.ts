import { LeaderBoard } from '@/models/leader-board';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    await connectViaMongoose();
    const session = await getServerSessionWithAuthOptions();

    const leaderboard = await LeaderBoard.find()
      .sort({ totalScore: -1 })
      .limit(10);

    if (session) {
      const currentStudent = await Student.findOne({
        email: session.user.email,
      });

      const studentId = currentStudent._id;

      const studentInTopList = leaderboard.find(
        (student) => student.id.toString() === studentId.toString(),
      );

      console.log({ studentInTopList });

      if (!studentInTopList) {
        const studentLeaderBoard = await LeaderBoard.findOne({
          student: studentId,
        });

        const totalScore = studentLeaderBoard.totalScore;

        const position = await LeaderBoard.countDocuments({
          totalScore: { $gt: totalScore },
        });

        const leaderBoardWithCurrentUserPosition = {
          leaderboard,
          position,
        };

        console.log(leaderBoardWithCurrentUserPosition);

        return NextResponse.json(
          {
            message: 'Leaderboard with current user position fetched.',
            leaderBoardWithCurrentUserPosition,
          },
          {
            status: 200,
          },
        );
      }

      return NextResponse.json(
        {
          message: 'Leaderboard with current user in top 10 fetched.',
          leaderboard,
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { message: 'Leaderboard fetched.', leaderboard },
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

const POST = async () => {
  const body = await req.json();
  try {
    await connectViaMongoose();
  } catch (error) {}
};

export { GET };
