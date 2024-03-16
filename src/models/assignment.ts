import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
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
