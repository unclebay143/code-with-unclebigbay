import { Hackathon } from '@/models/hackathon';
import { HackathonSubmission } from '@/models/hackathonSubmission';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';
import { Student } from '@/models/student';

const GET = async (request: any, { params }: { params: { slug: string } }) => {
  try {
    const hackathonSlug = params.slug;
    await connectViaMongoose();
    const hackathon = await Hackathon.findOne({ slug: hackathonSlug });
    if (!hackathon) {
      return NextResponse.json(
        { message: 'Hackathon does not exist' },
        { status: 404 },
      );
    }

    const submissions = await HackathonSubmission.find({
      hackathon: hackathon._id,
    })
      .populate('student', '_id fullName stack photo username', Student)
      .populate('hackathon', 'name slug hashTag', Hackathon);

    return NextResponse.json(
      {
        message: 'Hackathon projects fetched successfully',
        submissions,
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: e.message },
      {
        status: 500,
      },
    );
  }
};

export { GET };
