import { Hackathon } from '@/models/hackathon';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request, _res: Response) => {
  const body = await req.json();

  try {
    const { feedback, ...otherPayload } = body;
    await connectViaMongoose();

    const newHackathon = await Hackathon.create(otherPayload);
    return NextResponse.json(
      { message: 'New hackathon created.', newHackathon },
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

const GET = async () => {
  try {
    await connectViaMongoose();
    const hackathons = await Hackathon.aggregate([
      {
        $lookup: {
          from: 'hackathonRegistrations',
          localField: '_id',
          foreignField: 'hackathon',
          as: 'participants',
        },
      },
      {
        $addFields: {
          participantCount: { $size: '$participants' },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          startDate: 1,
          endDate: 1,
          coverImage: 1,
          tags: 1,
          brief: 1,
          slug: 1,
          participantCount: 1,
        },
      },
    ]);

    return NextResponse.json(
      { message: 'Hackathons fetched successfully', hackathons },
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

export { POST, GET };
