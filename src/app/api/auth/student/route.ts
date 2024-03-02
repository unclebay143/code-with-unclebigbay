import { NextResponse } from 'next/server';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Student } from '@/models/student';

/* 
@usecase: to fetch currently logged in user/student profile
*/
const GET = async () => {
  try {
    const session = await getServerSessionWithAuthOptions();

    if (!session) {
      return NextResponse.json(
        { message: 'No valid session' },
        {
          status: 404,
        },
      );
    }

    const student = await Student.findOne({ email: session.user.email });
    return NextResponse.json(
      { message: 'Current student profile fetched successfully', student },
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
