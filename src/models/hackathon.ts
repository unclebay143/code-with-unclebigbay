import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const hackathonSchema = new Schema(
  {
    hackathon: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    about: { type: String, required: true },
    whatToBuild: { type: String, required: true },
    howToParticipate: [{ type: String, required: true }],
    judges: [
      { name: String, title: String, photo: String, socialLink: String },
    ],
    judgingCriteria: [{ heading: String, copy: String }],
    prizes: [{ position: Number, prizes: [{ type: String }] }],
    sponsors: [{ name: String, photo: String, link: String }],
  },
  {
    timestamps: true,
    collection: 'hackathons',
  },
);

const Hackathon = models.Hackathon || model('Hackathon', hackathonSchema);

export { Hackathon };
