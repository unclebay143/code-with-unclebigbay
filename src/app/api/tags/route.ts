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
    const tags = Tag.find({});
    return NextResponse.json(
      { message: 'Tags fetched successfully', tags },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { GET, POST };
