import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
  CROSS_ORIGIN_CLIENT: process.env.CROSS_ORIGIN_CLIENT,
  CROSS_ORIGIN_ADMIN: process.env.CROSS_ORIGIN_ADMIN,
  CROSS_ORIGIN_ADMIN_LOCALHOST: process.env.CROSS_ORIGIN_ADMIN_LOCALHOST,
  CROSS_ORIGIN_CLIENT_LOCALHOST: process.env.CROSS_ORIGIN_CLIENT_LOCALHOST,


};
