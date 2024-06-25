import { NextResponse } from 'next/server';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';

const GET = async () => {
  try {
    await connectViaMongoose();

    const students = await Student.find({
      isAnonymous: false,
      fullName: { $exists: true, $ne: null }, // exclude students without name from GH
    })
      .select('username fullName photo stack socials')
      // .limit(100)
      .lean()
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
