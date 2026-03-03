import { z } from 'zod';

export const createJobSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title is required"),
        company: z.string().min(2, "Company is required"),
        location: z.string().min(2, "Location is required"),
        category: z.string().min(2, "Category is required"),
        description: z.string().min(10, "Description too short"),
    })
});

export const updateJobSchema = createJobSchema.partial();