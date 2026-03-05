import mongoose, { Schema, Model, Document } from 'mongoose';
import { IJob } from './job.interface';

export interface JobDocument extends IJob, Document {}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    latest: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

jobSchema.index({ featured: 1 });
jobSchema.index({ latest: 1 });

export const Job: Model<JobDocument> = mongoose.model<JobDocument>(
  'Job',
  jobSchema
);
