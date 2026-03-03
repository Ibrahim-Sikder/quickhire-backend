import { z } from 'zod';

export const createApplicationSchema = z.object({
    job: z.string().min(1, "Job ID required"),

    name: z.string().min(2, "Name required"),

    email: z.string().email("Invalid email format"),

    resume_link: z.string().url("Resume must be a valid URL"),

    cover_note: z.string().optional(),
});