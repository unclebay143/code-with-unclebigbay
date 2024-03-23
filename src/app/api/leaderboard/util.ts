import { LeaderBoard } from '@/models/leader-board';

export const updateLeaderboard = async ({
  studentId,
  newScore,
}: {
  studentId: string;
  newScore: number;
}) => {
  try {
    await LeaderBoard.findOneAndUpdate(
      {
        student: studentId,
      },
      {
        $inc: { totalScore: newScore },
      },
      { new: true },
    );
  } catch (e: any) {
    throw new Error(e);
  }
};
