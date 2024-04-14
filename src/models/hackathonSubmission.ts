import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const hackathonSubmissionSchema = new Schema(
  {
    hackathon: { type: Schema.ObjectId, ref: 'Hackathon', required: true },
    student: { type: Schema.ObjectId, ref: 'Student', required: true },
    project: {
      name: { type: String },
      url: { type: String },
      demoUrl: { type: String },
      articleUrl: { type: String },
      repositoryUrl: { type: String },
      socialUrl: { type: String },
    },
    isBanned: { type: Boolean },
    feedback: { type: String },
  },
  {
    timestamps: true,
    collection: 'hackathonSubmissions',
  },
);

const HackathonSubmission =
  models.HackathonSubmission ||
  model('HackathonSubmission', hackathonSubmissionSchema);

export { HackathonSubmission };
