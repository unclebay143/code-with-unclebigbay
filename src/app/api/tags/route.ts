import { Tag } from '@/models/tag';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request) => {
  const body = await req.json();
  try {
    await connectViaMongoose();
    const tag = await Tag.create(body);
    return NextResponse.json({ message: 'Tag created', tag }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const GET = async () => {
  try {
    await connectViaMongoose();
    const tags = await Tag.find({ isActive: true });
    return NextResponse.json(
      { message: 'Tags fetched successfully', tags },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const DELETE = async (req: Request, res: Response) => {
  const body = await req.json();
  try {
    await connectViaMongoose();
    await Tag.findOneAndUpdate(
      { _id: body._id },
      { $set: { isActive: false } },
      { new: true },
    );
    return NextResponse.json(
      { message: 'Tag deleted' },
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

export { GET, POST, DELETE };
