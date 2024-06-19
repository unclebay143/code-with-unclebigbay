import { Hackathon } from '@/models/hackathon';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    await connectViaMongoose();
    const hackathon = await Hackathon.find({
      isActive: true,
    })
      .sort({
        createdAt: -1,
      })
      .limit(1)
      .lean()
      .exec();

    return NextResponse.json(
      {
        message: 'Current hackathon fetched successfully',
        hackathon: hackathon[0],
      },
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
