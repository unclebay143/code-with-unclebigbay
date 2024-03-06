import mongoose, { model, models } from 'mongoose';
import Joi from 'joi';

const Schema = mongoose.Schema;

// Enums
const ALLOWED_GENDER = ['male', 'female'];
const ALLOWED_STACK = ['frontend', 'backend', 'full-stack'];

const studentSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true },
    username: { type: String },
    bio: { type: String },
    socials: {
      portfolio: { type: String, default: '' },
      blog: { type: String, default: '' },
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
    stack: { type: String, enum: ALLOWED_STACK, default: null },
    photo: { type: String, default: '' },
    isPro: { type: Boolean, default: false },
    accountOnHold: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    isAnonymous: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isModerator: { type: Boolean, default: false },
    nationality: { type: String, default: '' },
    state: { type: String, default: '' },
    location: { type: String, default: '' },
    gender: { type: String, enum: ALLOWED_GENDER },
    interests: { type: Array, default: null },
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

const Student = models.Student || model('Student', studentSchema);

export { Student, validateNewStudent };
