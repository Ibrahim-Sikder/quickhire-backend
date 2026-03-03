import mongoose, { Schema, Document, Model } from 'mongoose';
import { IJob } from './job.interface';

export interface JobDocument extends IJob, Document { }

const jobSchema = new Schema<JobDocument>(
    {
        title: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

export const Job: Model<JobDocument> = mongoose.model<JobDocument>(
    'Job',
    jobSchema
);