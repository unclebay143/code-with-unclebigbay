import { HackathonSubmission } from '@/models/hackathonSubmission';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { _id: string } }) => {
  try {
    const hackathonId = params._id;
    await connectViaMongoose();

    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }

    const student = await Student.findOne({ email: session.user.email });
    const studentId = student._id;

    const count = await HackathonSubmission.countDocuments({
      hackathon: hackathonId,
      student: studentId,
    });
    const hasSubmitted = count > 0;

    return NextResponse.json(
      { hasSubmitted },
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
