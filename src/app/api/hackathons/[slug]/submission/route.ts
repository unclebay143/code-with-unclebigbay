import { Hackathon } from '@/models/hackathon';
import { HackathonSubmission } from '@/models/hackathonSubmission';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (request: any, { params }: { params: { slug: string } }) => {
  try {
    const hackathonSlug = params.slug;
    await connectViaMongoose();
    const hackathon = await Hackathon.findOne({ slug: hackathonSlug });
    if (!hackathon) {
      return NextResponse.json(
        { message: 'Hackathon Slug does not exist' },
        { status: 404 },
      );
    }
    const hackathonSubmittedProjects = await HackathonSubmission.find({
      hackathon: hackathon._id,
    }).populate('student');
    return NextResponse.json(
      {
        message: 'Hackathon project fetched successfully',
        hackathonSubmittedProjects,
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
