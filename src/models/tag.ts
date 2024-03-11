import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    logo: { type: String },
    wiki: { type: String },
    isActive: { type: 'Boolean', default: true },
  },
  {
    timestamps: true,
    collection: 'tags',
  },
);

const Tag = models.Tag || model('Tag', tagSchema);

export { Tag };
