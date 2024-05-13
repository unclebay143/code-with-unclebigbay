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

const pickQuote = async () => {
  const quote = await Quote.findOne({ isReleased: false });

  if (quote) {
    quote.isReleased = true;
    await quote.save();
  }

  const lastReleasedQuote = await Quote.findOne({ isReleased: true }).sort({
    releaseDate: -1,
  });

  if (
    !lastReleasedQuote ||
    !lastReleasedQuote.releaseDate ||
    Date.now() - lastReleasedQuote.releaseDate.getTime() >= 24 * 60 * 60 * 1000
  ) {
    const newQuote = await Quote.findOneAndUpdate(
      { isReleased: false },
      { $set: { isReleased: true, releaseDate: new Date() } },
      { new: true },
    );
    return newQuote;
  } else {
    return quote;
  }
};

const GET = async () => {
  try {
    await connectViaMongoose();
    let quote;
    quote = await pickQuote();

    if (!quote) {
      await Quote.updateMany({ isReleased: true }, { isReleased: false });
      quote = await pickQuote();
    }
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
