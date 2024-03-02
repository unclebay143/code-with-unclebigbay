import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema({});

const Course = models.course || model('course', courseSchema);

export { Course };
