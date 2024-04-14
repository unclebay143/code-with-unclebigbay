import { Hackathon } from '@/models/hackathon';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { slug: string } }) => {
  try {
    const hackathonSlug = params.slug;

    await connectViaMongoose();
    const hackathon = await Hackathon.findOne({ slug: hackathonSlug });

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
