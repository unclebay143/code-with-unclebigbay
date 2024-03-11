import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String },
  slug: { type: String },
  logo: { type: String },
  wiki: { type: String },
});

const Tag = models.Tag || model('Tag', tagSchema);

export { Tag };
