import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const appEventSchema = new Schema(
  {
    event_name: { type: String, required: true },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    event_properties: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    collection: 'app-events',
  },
);

const AppEvent = models.AppEvent || model('AppEvent', appEventSchema);

export { AppEvent };
