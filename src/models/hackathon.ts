import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const hackathonSchema = new Schema(
  {
    coverImage: { type: String },
    desktopCoverImage: { type: String },
    ogImage: { type: String },
    hashTag: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    brief: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    about: { type: String, required: true },
    whatToBuild: { type: String, required: true },
    howToParticipate: [{ type: String, required: true }],
    judges: [
      { name: String, title: String, photo: String, socialLink: String },
    ],
    judgingCriteria: [{ heading: String, copy: String }],
    schedules: [{ heading: String, date: String, note: String }],
    resources: [{ label: String, url: String }],
    prizes: [{ label: String, prizes: [{ type: String }] }],
    sponsors: [{ name: String, photo: String, link: String }],
    status: { label: String, reason: String },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    collection: 'hackathons',
  },
);

const Hackathon = models.Hackathon || model('Hackathon', hackathonSchema);

export { Hackathon };
