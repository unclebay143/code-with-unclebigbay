import { NextResponse } from 'next/server';
import { Student } from '@/app/models/student';
import connectViaMongoose from '@/utils/mongoose';

const GET = async (req: Request, { params }: { params: { email: string } }) => {
  try {
    const email = params.email;
    if (!email) {
      return NextResponse.json(
        { message: 'Student email is required' },
        {
          status: 400,
        },
      );
    }
    await connectViaMongoose();
    const student = await Student.findOne({ email: email });
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
