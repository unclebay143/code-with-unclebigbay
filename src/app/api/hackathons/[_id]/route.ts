import { Hackathon } from '@/models/hackathon';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { _id: string } }) => {
  try {
    const hackathonId = params._id;

    await connectViaMongoose();
    const hackathon = await Hackathon.findOne({ _id: hackathonId });

    if (!hackathon) {
      return NextResponse.json(
        { message: 'Hackathon not found', hackathon },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Hackathon fetched successfully', hackathon },
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
