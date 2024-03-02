import { NextResponse } from 'next/server';
import { Student } from '@/models/student';
import connectViaMongoose from '@/utils/mongoose';

const GET = async (
  req: Request,
  { params }: { params: { username: string } },
) => {
  try {
    const username = params.username;

    await connectViaMongoose();
    const student = await Student.findOne({ username: username });
    if (!student) {
      return NextResponse.json(
        { message: 'Student record not found', student },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Student record fetched successfully', student },
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

// const test = { "_id": "65db8485f354001f95de3fd8", "username": "unclebay143", "stack": "backend" }

interface CustomResponse extends Response {
  params: { username: string };
}

const POST = async (req: Request, res: CustomResponse) => {
  try {
    const { username } = res.params; // to ensure username in the api route [username] is same as the one in the body
    const body = await req.json();
    const { _id } = body;

    await connectViaMongoose();
    const student = await Student.findOneAndUpdate(
      { _id, username },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!student) {
      return NextResponse.json(
        { message: 'Student record not found', student },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { message: 'Student record updated successfully', student },
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

export { GET, POST };
