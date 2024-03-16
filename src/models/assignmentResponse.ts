import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;
const ALLOWED_STATUS = ['PASSED', 'FAILED'];

const assignmentResponseSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    index: true,
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    index: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    index: true,
  },
  score: { type: Number },
  status: { type: String, enum: ALLOWED_STATUS },
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
