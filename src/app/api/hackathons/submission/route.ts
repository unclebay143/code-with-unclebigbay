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

    const members = body.members;
    const hasMembers = members.length > 0;

    const hackathon = await Hackathon.findOne({ _id: hackathonId });

    await AuditTrail.create({
      student: studentId,
      type: 'hackathon',
      title: `Hackathon project submission 🎉`,
      description: `Submitted a project for an hackathon: ${hackathon.name}.`,
    });

    if (hasMembers) {
      const membersAudit = members.map((member: string) => {
        return {
          student: member,
          type: 'hackathon',
          title: `Hackathon project member 🤝`,
          description: `Included as a team member of a submitted project for an hackathon: ${hackathon.name}.`,
        };
      });

      await AuditTrail.insertMany(membersAudit);
    }

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

export { POST };
