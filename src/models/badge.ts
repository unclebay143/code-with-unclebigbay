import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const badgeSchema = new Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    badge: [
      {
        label: { type: String },
        theme: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'badges',
  },
);

const Badge = models.Badge || model('Badge', badgeSchema);

export { Badge };
