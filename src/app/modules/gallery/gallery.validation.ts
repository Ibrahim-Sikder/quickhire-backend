import { z } from 'zod';

export const uploadImageToGallerySchema = z.object({
  body: z.object({
    folder: z.string({
      required_error: 'Folder is required',
      invalid_type_error: 'Folder must be a string',
    }),
  }),
});

export const deleteImageFromGallerySchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Image ID is required',
      invalid_type_error: 'Image ID must be a string',
    }),
    public_id: z.string({
      required_error: 'Public ID is required',
      invalid_type_error: 'Public ID must be a string',
    }),
  }),
});

export const createFolderSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Folder name is required',
      invalid_type_error: 'Folder name must be a string',
    }),
  }),
});
