import { Assignment } from '@/models/assignment';
import { Material } from '@/models/material';
import { Student } from '@/models/student';
import { Tag } from '@/models/tag';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    await connectViaMongoose();
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: 'Session required' },
        { status: 403 },
      );
    }
    const student = await Student.findOne({ email: session?.user.email });
    const userStack = student.stack || 'platform-guide';
    const userHasStack = session && userStack;
    const isFullStack = student.stack === 'full-stack';

    if (userHasStack && !isFullStack) {
      const tag = await Tag.findOne({ name: { $in: userStack } });

      if (tag) {
        const materials = await Material.find({
          isActive: true,
          tags: { $in: tag._id },
        });

        return NextResponse.json(
          { message: 'Materials fetched.', materials },
          { status: 200 },
        );
      }
    }

    const materials = await Material.find({ isActive: true });
    return NextResponse.json(
      { message: 'Materials fetched.', materials },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connectViaMongoose();

    const { questions, ...otherPropsWithoutQuestions } = body;

    const assignment = await Assignment.create({ questions });

    const material = await Material.create({
      ...otherPropsWithoutQuestions,
      assignment: assignment._id,
    });

    await Assignment.findOneAndUpdate(
      { _id: assignment._id },
      { materialId: material._id },
    );
    return NextResponse.json(
      { message: 'Material created.', material },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { GET, POST };
