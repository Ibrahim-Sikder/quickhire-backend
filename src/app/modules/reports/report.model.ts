import { Schema, model } from 'mongoose';
import { TReport } from './report.interface';

const reportSchema = new Schema<TReport>(
  {
    img_tagline_bangla: {
      type: String,
    },
    img_tagline_english: {
      type: String,
    },
    img_bangla: {
      type: String,
    },
    img_english: {
      type: String,
    },
    thumnail_img: {
      type: String,
    },
    slug: {
      type: String,
    },
    admin_name: {
      type: String,
    },
    date: {
      type: String,
    },
    bangla_title: {
      type: String,
      required: [true, 'Bangla title is required'],
    },
    english_title: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'At least one category is required'],
    },
    bangla_short_description: {
      type: String,
    },
    english_short_description: {
      type: String,
    },
    bangla_description: {
      type: String,
    },
    english_description: {
      type: String,
    },
    name_published_newspaper: {
      type: String,
    },
    news_release_date: {
      type: String,
    },
    Link_published_newspaper: {
      type: String,
    },
    published_newspapers: [
      {
        name: { type: String },
        release_date: { type: String },
        link: { type: String },
        screenshot: { type: [String] },
      },
    ],
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    newsCategory: {
      type: String,
    },
    meta_keywords: {
      type: [String],
    },
    bng_Images: {
      type: [String],
    },
    eng_iamges: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const Report = model<TReport>('Report', reportSchema);
