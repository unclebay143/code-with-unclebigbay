import { AuditTrail } from '@/models/audit-trail';
import { Hackathon } from '@/models/hackathon';
import { HackathonSubmission } from '@/models/hackathonSubmission';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request, _res: Response) => {
  const body = await req.json();

  try {
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }

    await connectViaMongoose();
    const submission = await HackathonSubmission.create(body);

    const hackathonId = body.hackathon;
    const studentId = body.student;

    const hackathon = await Hackathon.findOne({ _id: hackathonId });

    await AuditTrail.create({
      student: studentId,
      type: 'hackathon',
      title: `Hackathon submission`,
      description: `Submitted project for ${hackathon.name}`,
    });

    return NextResponse.json(
      { message: 'Hackathon project submitted.', submission },
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
    const submittedProjects = await Hackathon.aggregate([
      {
        $lookup: {
          from: 'hackathonsubmissions',
          localField: '_id',
          foreignField: 'hackathon',
          as: 'submissions',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          submissions: 1,
        },
      },
    ]);
    if (!submittedProjects) {
      return NextResponse.json(
        { message: 'Submission not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: 'Hackathon project fetched successfully', submittedProjects },
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
