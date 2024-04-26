import mongoose, { model, models } from 'mongoose';

const Schema = mongoose.Schema;

const ALLOWED_AUDIT_TYPE = [
  'onboarding',
  'system',
  'course',
  'assignment',
  'badge',
  'hackathon',
];

const auditTrailSchema = new Schema(
  {
    type: { type: String, enum: ALLOWED_AUDIT_TYPE, default: 'system' },
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
