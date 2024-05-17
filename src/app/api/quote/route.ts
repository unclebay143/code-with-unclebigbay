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
  const A_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

  try {
    const lastReleasedQuoteArray = await Quote.find({ isReleased: true })
      .sort({
        releasedDate: -1,
      })
      .limit(1)
      .lean();

    const lastReleasedQuote = lastReleasedQuoteArray[0];

    if (lastReleasedQuote && lastReleasedQuote.releasedDate) {
      const releasedDateTime = lastReleasedQuote.releasedDate.getTime();
      const today = Date.now();

      const isDue = today - releasedDateTime >= A_DAY_IN_MILLISECONDS;

      if (!isDue) {
        return lastReleasedQuote;
      }
    }

    const quote = await Quote.findOne({ isReleased: false });

    if (!quote) {
      return null;
    }

    quote.isReleased = true;
    quote.releasedDate = new Date();
    await quote.save();
    return quote;
  } catch (e) {
    console.log(e);
    return null;
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
