import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: [
    {
      option: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
  answerExplanation: { type: String, default: null },
});

const Question = models.Question || model('Question', questionSchema);

export { Question };
// Todo: add validation for only one isCorrect option
