import { AuditTrail } from '@/models/audit-trail';
import { Student } from '@/models/student';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }

    const student = await Student.findOne({ email: session.user.email });
    const audit = await AuditTrail.find({ student: student.id });

    return NextResponse.json(
      { message: 'Student audits fetched', audit },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    if (!body.studentId) {
      return NextResponse.json(
        { message: 'studentId is required' },
        { status: 403 },
      );
    }
    await connectViaMongoose();
    await AuditTrail.create({ student: body.studentId, ...body });
    return NextResponse.json({ message: 'Audit logged.' }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { GET, POST };
