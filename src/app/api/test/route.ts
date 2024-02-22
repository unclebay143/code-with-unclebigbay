import connectViaMongoose from '@/utils/mongoose';

const GET = async () => {
  await connectViaMongoose();
  return Response.json('Hi');
};

export { GET };
