import { NextResponse } from 'next/server';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';
import { LeaderBoard } from '@/models/leader-board';

const GET = async (
  _: Request,
  { params }: { params: { username: string } },
) => {
  try {
    const username = params.username;

    await connectViaMongoose();
    let student = await Student.findOne({ username: username });
    if (!student) {
      return NextResponse.json(
        { message: 'Student record not found', student },
        {
          status: 404,
        },
      );
    }

    const leaderboard = await LeaderBoard.findOne({
      student: student._id,
    });

    if (leaderboard) {
      student = {
        ...student.toJSON(),
        totalScore: leaderboard.totalScore,
      };
    }

    return NextResponse.json(
      { message: 'Student record fetched successfully', student },
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

interface CustomResponse extends Response {
  params: { username: string };
}

// Student profile update
const PATCH = async (req: Request, res: CustomResponse) => {
  try {
    const { username } = res.params; // to ensure username in the api route [username] is same as the one in the body
    const body = await req.json();
    const { _id } = body;

    await connectViaMongoose();
    const student = await Student.findOneAndUpdate(
      { _id, username },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!student) {
      return NextResponse.json(
        { message: 'Student record not found', student },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Student record updated successfully', student },
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

export { GET, PATCH };
