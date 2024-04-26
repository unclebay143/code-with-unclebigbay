import { Hackathon } from '@/models/hackathon';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    const hackathon = await Hackathon.find({ isActive: true })
      .sort({
        createdAt: -1,
      })
      .limit(1);

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
