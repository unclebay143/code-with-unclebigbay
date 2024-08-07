import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const badgeSchema = new Schema(
  {
    studentBadge: {
      student: { type: Schema.Types.ObjectId, ref: 'Student' },
      badge: { type: String },
      achievedDate: { type: Date },
    },
    badges: {
      name: { type: String },
      displayName: { type: String },
      description: { type: String },
      url: { type: String },
      badge: { label: { type: String }, theme: { type: String } },
    },
  },
  {
    timestamps: true,
    collection: 'badges',
  },
);

const Badge = models.Badge || model('Badge', badgeSchema);

export { Badge };
