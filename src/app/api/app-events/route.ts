import { AppEvent } from '@/models/appEvents';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connectViaMongoose();
    await AppEvent.create(body);
    return NextResponse.json({ message: 'Event logged.' }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { POST };
