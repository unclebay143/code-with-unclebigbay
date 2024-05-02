import { Hackathon } from '@/models/hackathon';
import { HackathonRegistration } from '@/models/hackathonRegistration';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { slug: string } }) => {
  try {
    const hackathonSlug = params.slug;

    await connectViaMongoose();
    let hackathon = await Hackathon.findOne({ slug: hackathonSlug });

    if (!hackathon) {
      return NextResponse.json(
        { message: 'Hackathon not found', hackathon },
        {
          status: 404,
        },
      );
    }

    const registrations = await HackathonRegistration.find({
      hackathon: hackathon._id,
    }).select('student');

    const studentIds = registrations.map(
      (registration) => registration.student,
    );

    const students = await Student.find({
      _id: { $in: studentIds },
    }).select('_id fullName photo stack username isAnonymous');

    hackathon = { ...hackathon._doc, participants: students };

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
