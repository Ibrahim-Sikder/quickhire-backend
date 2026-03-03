import { ObjectId } from "mongoose";

export interface IApplication {
    job: ObjectId; // Job ID
    name: string;
    email: string;
    resume_link: string;
    cover_note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}