import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

// enums
const ALLOWED_TYPE = ['video', 'post'];

const courseSchema = new Schema(
  {
    type: {
      type: String,
      enum: ALLOWED_TYPE,
      required: [true, 'Course type is required'],
    },
    slug: {
      type: String,
      required: [true, 'Course slug is required'],
      unique: true,
      index: true,
    },
    title: { type: String },
    subTitle: { type: String, default: '' },
    brief: { type: String, default: '' },
    description: { type: String, default: '' },
    url: { type: String, default: '' },
    ytVideoId: { type: String, default: '' },
    coverImageUrl: { type: String, default: '' },
    version: { type: Number, default: 1 },
    viewTime: { type: Number },
    readTime: { type: Number },
    usefulLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],
    content: { type: String, default: '' },
    contentMarkdown: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'Student' },
    coAuthors: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
    recommendedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    isActive: { type: 'Boolean', default: true },
  },
  {
    timestamps: true,
    collection: 'courses',
  },
);

const Course = models.Course || model('Course', courseSchema);

export { Course };
