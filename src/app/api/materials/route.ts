import { Material } from '@/models/material';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async () => {
  try {
    await connectViaMongoose();
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
    const material = await Material.create(body);
    return NextResponse.json(
      { message: 'Material created.', material },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export { GET, POST };
