import mongoose, { model, models } from 'mongoose';
import Joi from 'joi';

const Schema = mongoose.Schema;

// Enums
const ALLOWED_GENDER = ['Male', 'Female'];

const studentSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true },
    username: { type: String },
    bio: { type: String },
    socials: {
      website: { type: String, default: '' },
      github: { type: String, default: '' },
      x: { type: String, default: '' },
      facebook: { type: String, default: '' },
      mastodon: { type: String, default: '' },
      thread: { type: String, default: '' },
      stackoverflow: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      youtube: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    photo: String,
    isPro: { type: Boolean, default: false },
    accountOnHold: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    nationality: { type: String, default: '' },
    state: { type: String, default: '' },
    location: { type: String, default: '' },
    gender: { type: String, enum: ALLOWED_GENDER },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.userId = ret._id;
        // delete ret.createdAt;
        // delete ret.updatedAt;
        // delete ret.__v;
        // delete ret._id;
      },
    },
    timestamps: true,
    collection: 'students',
  },
);

const validateNewStudent = (student: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(student);
};

const Student = models.student || model('student', studentSchema);

export { Student, validateNewStudent };