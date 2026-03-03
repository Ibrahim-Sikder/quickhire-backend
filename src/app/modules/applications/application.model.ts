import mongoose, { Schema, Document, Model } from 'mongoose';
import { IApplication } from './application.interface';

export interface ApplicationDocument
    extends IApplication,
    Document { }

const applicationSchema = new Schema<ApplicationDocument>(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },

        resume_link: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, 'Resume must be a valid URL'],
        },

        cover_note: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

/*
  ✅ Important:
  Use ApplicationDocument here — NOT IApplication
*/

export const Application: Model<ApplicationDocument> =
    mongoose.model<ApplicationDocument>('Application', applicationSchema);