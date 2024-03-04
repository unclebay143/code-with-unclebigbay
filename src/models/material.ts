import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

// enums
const ALLOWED_TYPE = ['video', 'post'];

const materialSchema = new Schema({
  type: {
    type: { type: String, index: true },
    enum: ALLOWED_TYPE,
    default: null,
    required: [true, 'Material type is required'],
  },
  title: { type: String, index: true },
  subTitle: { type: String, default: '' },
  description: { type: String, default: '' },
  url: { type: String, default: '' },
  embedUrl: { type: String, default: '' },
  coverImageURL: { type: String, default: '' },
  version: [{ type: Number, default: 1 }],
  readTime: { type: Number },
  usefulLinks: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  content: { type: String, default: '' },
  contentMarkdown: { type: String, default: '' },
  author: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  coAuthors: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  assignment: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  recommendedCourses: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
});

const Material = models.Material || model('Material', materialSchema);

export { Material };
