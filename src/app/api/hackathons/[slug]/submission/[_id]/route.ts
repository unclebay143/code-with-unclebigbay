import { HackathonSubmission } from '@/models/hackathonSubmission';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';
// import { Hackathon } from '@/models/hackathon';

const GET = async (request: any, { params }: { params: { _id: string } }) => {
  try {
    const id = params._id;
    await connectViaMongoose();
    const submittedHackathonProject = await HackathonSubmission.findOne({
      _id: id,
    });
    if (!submittedHackathonProject) {
      return NextResponse.json(
        { message: 'Project id not found!!' },
        { status: 404 },
      );
    }
    return NextResponse.json({ submittedHackathonProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching project by id ' },
      { status: 500 },
    );
  }
};

export { GET };
