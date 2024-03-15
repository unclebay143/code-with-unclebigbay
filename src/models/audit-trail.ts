import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const auditTrailSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
  },
  {
    timestamps: true,
    collection: 'audit-trails',
  },
);

const AuditTrail = models.AuditTrail || model('AuditTrail', auditTrailSchema);

export { AuditTrail };
