import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});

const Assignment = models.Assignment || model('Assignment', assignmentSchema);

export { Assignment };
