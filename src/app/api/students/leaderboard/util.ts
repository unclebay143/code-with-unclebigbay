import { LeaderBoard } from '@/models/leader-board';
import connectViaMongoose from '@/utils/mongoose';

export const updateLeaderboard = async ({
  studentId,
  newScore,
}: {
  studentId: string;
  newScore: number;
}) => {
  try {
    await connectViaMongoose();
    await LeaderBoard.findOneAndUpdate(
      {
        student: studentId,
      },
      {
        $inc: { totalScore: newScore },
      },
      { upsert: true, new: true },
    );
  } catch (e: any) {
    throw new Error(e);
  }
};
