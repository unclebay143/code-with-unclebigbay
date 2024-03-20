import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'assignments',
  },
);

const Assignment = models.Assignment || model('Assignment', assignmentSchema);

export { Assignment };
