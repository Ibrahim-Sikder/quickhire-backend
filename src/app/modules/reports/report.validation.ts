import { z } from 'zod';

export const createReportValidation = z.object({
  body: z.object({
    img_tagline_bangla: z.string().optional(),
    img_tagline_english: z.string().optional(),
    admin_name: z.string().optional(),
    date: z.string().optional(),
    bangla_title: z.string({
      required_error: 'Bangla title is required',
    }),
    english_title: z.string(),
    category: z.string({
      required_error: 'At least one category is required',
    }),
    bangla_short_description: z.string().optional(),
    english_short_description: z.string().optional(),
    bangla_description: z.string().optional(),
    english_description: z.string().optional(),
    name_published_newspaper: z.string().optional(),
    news_release_date: z.string().optional(),
    Link_published_newspaper: z.string().optional(),

    published_newspapers: z
      .array(
        z.object({
          name: z.string().optional(),
          release_date: z.string().optional(),
          link: z.string().optional(),
          screenshot: z.array(z.string()).optional(),
        })
      )
      .optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.array(z.string()).optional(),
    bng_Images: z.array(z.string()).optional(),

    eng_iamges: z.array(z.string()).optional(),
  }),
});

export const updateReportValidation = z.object({
  body: z.object({
    img_tagline_bangla: z.string().optional(),
    img_tagline_english: z.string().optional(),
    admin_name: z.string().optional(),
    date: z.string().optional(),
    bangla_title: z.string().optional(),
    english_title: z.string().optional(),
    category: z.string().optional(),
    bangla_short_description: z.string().optional(),
    english_short_description: z.string().optional(),
    bangla_description: z.string().optional(),
    english_description: z.string().optional(),
    name_published_newspaper: z.string().optional(),
    news_release_date: z.string().optional(),
    Link_published_newspaper: z.string().optional(),
    published_newspapers: z
      .array(
        z.object({
          name: z.string().optional(),
          release_date: z.string().optional(),
          link: z.string().optional(),
          screenshot: z.array(z.string()).optional(),
        })
      )
      .optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.array(z.string()).optional(),
    bng_Images: z.array(z.string()).optional(),

    eng_iamges: z.array(z.string()).optional(),
  }),
});

export const ReportValidations = {
  createReportValidation,
  updateReportValidation,
};
