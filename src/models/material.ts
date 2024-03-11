import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

// enums
const ALLOWED_TYPE = ['video', 'post'];

const materialSchema = new Schema(
  {
    type: {
      type: String,
      enum: ALLOWED_TYPE,
      required: [true, 'Material type is required'],
    },
    title: { type: String },
    subTitle: { type: String, default: '' },
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
    assignment: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    recommendedCourses: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    isActive: { type: 'Boolean', default: true },
  },
  {
    timestamps: true,
    collection: 'materials',
  },
);

const Material = models.Material || model('Material', materialSchema);

export { Material };
