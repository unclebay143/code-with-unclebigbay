import connectViaMongoose from '@/utils/mongoose';
import { Quote } from '@/models/quote';
import { NextResponse } from 'next/server';
// import { getServerSessionWithAuthOptions } from '@/utils/auth-options';

const POST = async (req: Request, _res: Response) => {
  const body = await req.json();

  try {
    await connectViaMongoose();
    const quoteAlreadyExist = await Quote.findOne({
      quote: body.quote,
    });

    if (quoteAlreadyExist) {
      return NextResponse.json(
        { message: 'Quote already exist', quoteAlreadyExist },
        {
          status: 409,
        },
      );
    }

    const newQuote = await Quote.create(body);
    return NextResponse.json(
      { message: 'Quote created successfully', newQuote },
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

const GET = async () => {
  try {
    await connectViaMongoose();
    const quote = await Quote.findOne({ isReleased: false });
    //Use cron-job to set this quote to true after 24hrs after getting.
    //check all the quote status after and set it back to false if all is now true.
    return NextResponse.json(
      { message: 'Quote fetched successfully', quote },
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

export { POST, GET };
