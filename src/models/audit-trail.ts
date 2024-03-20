import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const auditTrailSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String },
  },
  {
    timestamps: true,
    collection: 'audit-trails',
  },
);

const AuditTrail = models.AuditTrail || model('AuditTrail', auditTrailSchema);

export { AuditTrail };
