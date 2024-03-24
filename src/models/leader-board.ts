import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema(
  {
    student: { type: mongoose.Types.ObjectId, ref: 'Student', required: true },
    totalScore: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: 'leaderboard',
  },
);

const LeaderBoard =
  models.LeaderBoard || model('LeaderBoard', leaderBoardSchema);

export { LeaderBoard };
