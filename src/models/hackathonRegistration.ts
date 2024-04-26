import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const hackathonRegistrationSchema = new Schema(
  {
    hackathon: { type: Schema.ObjectId, ref: 'Hackathon', required: true },
    student: {
      type: Schema.ObjectId,
      ref: 'Student',
      required: true,
      unique: true,
    },
    isBanned: { type: Boolean },
  },
  {
    timestamps: true,
    collection: 'hackathonRegistrations',
  },
);

const HackathonRegistration =
  models.HackathonRegistration ||
  model('HackathonRegistration', hackathonRegistrationSchema);

export { HackathonRegistration };
