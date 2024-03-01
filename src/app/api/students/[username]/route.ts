import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { Student } from '@/app/models/student';
import connectViaMongoose from '@/utils/mongoose';

const GET = async (
  req: NextApiRequest,
  { params }: { params: { username: string } },
) => {
  try {
    await connectViaMongoose();
    const username = params.username;
    const student = await Student.find({ username: username }).exec();

    return NextResponse.json(
      { message: 'Student fetched successfully', student },
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
