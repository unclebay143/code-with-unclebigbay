import { AuditTrail } from '@/models/audit-trail';
import { Hackathon } from '@/models/hackathon';
import { HackathonRegistration } from '@/models/hackathonRegistration';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request, _res: Response) => {
  const body = await req.json();

  try {
    const { hackathonId, studentId } = body;

    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }

    await connectViaMongoose();

    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (hackathon.status === 'ENDED') {
      // Todo: end hackathon via API call when countdown expired
      return NextResponse.json({ message: 'Hackathon ended' }, { status: 404 });
    }

    const alreadyRegistered = await HackathonRegistration.findOne({
      hackathon: hackathonId,
      student: studentId,
    });

    if (alreadyRegistered) {
      return NextResponse.json(
        { message: 'Already registered.' },
        {
          status: 409,
        },
      );
    }
    const newParticipant = await HackathonRegistration.create({
      hackathon: hackathonId,
      student: studentId,
    });

    await AuditTrail.create({
      student: studentId,
      type: 'hackathon',
      title: `Hackathon registration`,
      description: `Register for the ${hackathon.name}`,
    });

    return NextResponse.json(
      { message: 'Hackathon registration successful.', newParticipant },
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
