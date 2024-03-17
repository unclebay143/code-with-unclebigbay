import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;
const ALLOWED_STATUS = ['not attempted', 'passed', 'failed'];

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
  grade: { type: String },
  status: { type: String, enum: ALLOWED_STATUS, default: 'not attempted' },
  response: [
    {
      question: {
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
