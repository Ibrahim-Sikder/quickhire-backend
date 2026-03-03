import express from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login/request-otp',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.requestLoginOtp,
);

router.post(
  '/login/verify-otp',
  AuthController.verifyLoginOtp,
);

router.post('/refresh-token', AuthController.refreshToken);

export const authRoutes = router;
