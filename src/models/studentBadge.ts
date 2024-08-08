import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const studentBadgeSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    badge: { type: Schema.Types.ObjectId, ref: 'Badge', required: true },
    achievedDate: { type: Date },
  },
  {
    timestamps: true,
    collection: 'studentBadges',
  },
);

const StudentBadge =
  models.StudentBadge || model('StudentBadge', studentBadgeSchema);

export { StudentBadge };
