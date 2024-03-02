import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const assignmentResponseSchema = new Schema({
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    index: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    index: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      answer: { type: String },
      isCorrect: Boolean,
    },
  ],
});

const AssignmentResponse =
  models.AssignmentResponse ||
  model('AssignmentResponse', assignmentResponseSchema);

export { AssignmentResponse };
