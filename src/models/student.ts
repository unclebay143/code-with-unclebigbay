import mongoose, { model, models } from 'mongoose';
import Joi from 'joi';
import { ALLOWED_STACK } from '@/utils/consts';

const Schema = mongoose.Schema;

// Enums
const ALLOWED_GENDER = ['male', 'female'];
const ALLOWED_AUTH_PROVIDER = ['github', 'google'];

const studentSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true },
    username: {
      type: String,
      collation: { locale: 'en', strength: 2 }, // Case-insensitive collation
    },
    bio: { type: String },
    socials: {
      portfolio: { type: String },
      blog: { type: String },
      github: { type: String },
      x: { type: String },
      facebook: { type: String },
      mastodon: { type: String },
      thread: { type: String },
      stackoverflow: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
      instagram: { type: String },
    },
    stack: { type: String, enum: ALLOWED_STACK, default: null },
    photo: { type: String },
    isPro: { type: Boolean },
    accountOnHold: { type: Boolean },
    isBanned: { type: Boolean },
    isAnonymous: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean },
    isAdmin: { type: Boolean },
    isModerator: { type: Boolean },
    nationality: { type: String },
    state: { type: String },
    location: { type: String },
    gender: { type: String, enum: ALLOWED_GENDER },
    interests: [{ type: String }],
    betaFeatures: { type: 'Object' },
    authProvider: { type: String, enum: ALLOWED_AUTH_PROVIDER },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
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
