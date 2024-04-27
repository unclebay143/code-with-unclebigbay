import { required } from 'joi';
import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const hackathonWinnerSchema = new Schema(
  {
    hackathon: { type: Schema.ObjectId, ref: 'Hackathon', required: true },
    student: { type: Schema.ObjectId, ref: 'Student', required: true },
    position: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'hackathonWinners',
  },
);

const HackathonWinner =
  models.HackathonWinner || model('HackathonWinner', hackathonWinnerSchema);

export { HackathonWinner };
