import { Hackathon } from '@/models/hackathon';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request, _res: Response) => {
  const body = await req.json();

  try {
    await connectViaMongoose();

    const newHackathon = await Hackathon.create(body);
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
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }
    const student = await Student.findOne({ email: session.user.email });

    const hackathons = await Hackathon.aggregate([
      {
        $lookup: {
          from: 'hackathonRegistrations',
          localField: '_id',
          foreignField: 'hackathon',
          as: 'participants',
          pipeline: [
            { $match: { student: student._id } }, // Filter registrations by student ID
          ],
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
          isActive: 1,
          status: 1,
          slug: 1,
          participantCount: 1,
          isRegistered: { $gt: [{ $size: '$participants' }, 0] }, // Check if participants exist
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
