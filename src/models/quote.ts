import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  quote: { type: String },
  isReleased: { type: Boolean, default: false },
  releasedDate: { type: Date },
});

const Quote = models.Quote || model('Quote', quoteSchema);

export { Quote };
