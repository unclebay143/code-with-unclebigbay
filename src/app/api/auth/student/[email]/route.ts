import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { email: string } }) => {
  try {
    const email = params.email;

    await connectViaMongoose();
    const student = await Student.findOne({ email });
    if (!student) {
      return NextResponse.json(
        { message: 'Student not found.', student },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Student fetched.', student },
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
