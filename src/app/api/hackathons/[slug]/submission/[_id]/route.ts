import { Hackathon } from '@/models/hackathon';
import { HackathonSubmission } from '@/models/hackathonSubmission';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (request: any, { params }: { params: { _id: string } }) => {
  try {
    const id = params._id;
    await connectViaMongoose();
    const submittedHackathonProject = await HackathonSubmission.findOne({
      _id: id,
    })
      .populate('student', '_id fullName stack photo username', Student)
      .populate('hackathon', 'name hashTag slug', Hackathon);

    if (!submittedHackathonProject) {
      return NextResponse.json(
        { message: 'Project id not found!!' },
        { status: 404 },
      );
    }
    return NextResponse.json(submittedHackathonProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching project by id ' },
      { status: 500 },
    );
  }
};

export { GET };
