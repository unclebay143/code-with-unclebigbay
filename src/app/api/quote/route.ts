import connectViaMongoose from '@/utils/mongoose';
import { Quote } from '@/models/quote';
import { NextResponse } from 'next/server';

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
    if (quote) {
      quote.isReleased = true;
      await quote.save();
    }
    const nextQuote = await Quote.findOne({ isReleased: false });
    if (!quote) {
      await Quote.updateMany({ isReleased: true }, { isReleased: false });
      await quote.save();
    }
    return NextResponse.json(
      { message: 'Quote fetched successfully', quote: nextQuote },
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
