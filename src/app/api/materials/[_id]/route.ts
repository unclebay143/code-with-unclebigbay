import { Material } from '@/models/material';
import connectViaMongoose from '@/utils/mongoose';
import { NextResponse } from 'next/server';

const GET = async (_: Request, { params }: { params: { _id: string } }) => {
  try {
    const _id = params._id;

    await connectViaMongoose();
    const material = await Material.findOne({ _id }).populate('tags');
    if (!material) {
      return NextResponse.json(
        { message: 'Material not found.', material },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Material fetched.', material },
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

export { GET };
