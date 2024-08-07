import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const studentBadgeSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    badge: { type: String, required: true },
    achievedDate: { type: Date },
  },
  {
    timestamps: true,
    collection: 'studentBadges',
  },
);

const badgeSchema = new Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    badge: {
      label: { type: String },
      theme: { type: String },
    },
  },
  {
    timestamps: true,
    collection: 'badges',
  },
);

const StudentBadge =
  models.StudentBadge || model('StudentBadge', studentBadgeSchema);
const Badge = models.Badge || model('Badge', badgeSchema);

export { StudentBadge, Badge };
