import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const enrollSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  enrolledDate: { type: Date, default: Date.now },
});

const Enroll = models.Enroll || model('Enroll', enrollSchema);

export { Enroll };
