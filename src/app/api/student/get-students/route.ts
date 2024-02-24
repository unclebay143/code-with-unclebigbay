import { NextResponse } from 'next/server';
import { Student } from '@/app/models/user';
import connectViaMongoose from '@/utils/mongoose';

const GET = async () => {
  try {
    await connectViaMongoose();
    const students = await Student.find({})
      .select('username fullName photo stack')
      .limit(10)
      .exec();
    return NextResponse.json(
      { message: 'Students fetched successfully', students },
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
