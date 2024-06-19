import { LeaderBoard } from '@/models/leader-board';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import type { LeaderBoard as LeaderBoardType } from '@/utils/types';
import { NextResponse } from 'next/server';

// const POST = async (req: Request, _res: Response) => {
//   const body = await req.json();
//   try {
//     await connectViaMongoose();

//     const { studentId, newScore } = body;
//     if (studentId || newScore) {
//       return NextResponse.json(
//         { message: 'studentId or newScore required' },
//         {
//           status: 404,
//         },
//       );
//     }

//     const updatedLeaderboard = await LeaderBoard.findOneAndUpdate(
//       {
//         student: studentId,
//       },
//       {
//         $inc: { totalScore: newScore },
//       },
//       { new: true },
//     );

//     return NextResponse.json(
//       {
//         message: 'Leaderboard updated.',
//         updatedLeaderboard,
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: e.message },

//       {
//         status: 500,
//       },
//     );
//   }
// };

const GET = async () => {
  try {
    await connectViaMongoose();
    const session = await getServerSessionWithAuthOptions();

    let leaderboard = await LeaderBoard.find()
      .sort({ totalScore: -1 })
      .limit(20)
      .populate({
        path: 'student',
        select: '_id fullName stack photo username isAdmin',
        model: Student,
      });

    // Todo: type
    const excludeAdmin = (leaderboard: any) =>
      leaderboard.filter(
        (l: { student: { isAdmin: boolean } }) => !l.student.isAdmin,
      );

    // leaderboard with rank
    leaderboard = excludeAdmin(leaderboard).map(
      (entry: any, index: number) => ({
        ...entry.toJSON(),
        rank: index + 1,
      }),
    );

    if (session) {
      const currentStudent = await Student.findOne({
        email: session.user.email,
      });

      const studentId = currentStudent._id;

      const studentInTopList = leaderboard.some(
        (leader) => leader.student._id.toString() === studentId.toString(),
      );

      if (studentInTopList) {
        const studentLeaderBoard = await LeaderBoard.findOne({
          student: studentId,
        }).populate('student', '_id fullName stack photo username', Student);

        // Get students above student
        const studentTotalScore = studentLeaderBoard.totalScore;

        const position = await LeaderBoard.countDocuments({
          totalScore: { $gt: studentTotalScore },
        });

        return NextResponse.json(
          {
            message: 'Leaderboard with current user position fetched.',
            leaderboard,
            position: position + 1,
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

export { GET };
