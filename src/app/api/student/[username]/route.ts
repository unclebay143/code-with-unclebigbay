import { NextResponse } from 'next/server';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';

const GET = async (
  req: Request,
  { params }: { params: { username: string } },
) => {
  try {
    const username = params.username;

    await connectViaMongoose();
    const student = await Student.findOne({ username: username });
    if (!student) {
      return NextResponse.json(
        { message: 'Student profile not found', student },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Student profile fetched successfully', student },
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
