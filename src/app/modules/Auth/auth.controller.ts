/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { AppError } from '../../error/AppError';

// const cookieOptions: any = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//   path: '/',
// };
const cookieOptions: any = {
  httpOnly: true,
  secure: true, // always true for production because Nginx handles HTTPS
  sameSite: 'none', // allow cross-site if frontend and API differ
  path: '/',
};

const requestLoginOtp = catchAsync(async (req, res) => {
  const result = await AuthServices.requestLoginOtp(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'OTP sent successfully', data: result });
});

const verifyLoginOtp = catchAsync(async (req, res) => {
  const result = await AuthServices.verifyLoginOtp(req.body);
  const { accessToken, refreshToken, user } = result;

  res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Login successful via OTP', data: { user } });
});

const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new AppError(httpStatus.UNAUTHORIZED, 'No refresh token found');

  const newAccessToken = await AuthServices.refreshToken(token);
  res.cookie('accessToken', newAccessToken.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Access token refreshed successfully', data: newAccessToken });
});

export const AuthController = { requestLoginOtp, verifyLoginOtp, refreshToken };
