import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_pass: process.env.DEFAULT_PASS,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  reset_pass_uiLink: process.env.RESET_PASS_UILINK,

  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,

  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,

  CROSS_ORIGIN_CLIENT: process.env.CROSS_ORIGIN_CLIENT,
  CROSS_ORIGIN_ADMIN: process.env.CROSS_ORIGIN_ADMIN,
  CROSS_ORIGIN_ADMIN_LOCALHOST: process.env.CROSS_ORIGIN_ADMIN_LOCALHOST,
  CROSS_ORIGIN_CLIENT_LOCALHOST: process.env.CROSS_ORIGIN_CLIENT_LOCALHOST,

  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_PHONE_NUMBER,
  },
};
