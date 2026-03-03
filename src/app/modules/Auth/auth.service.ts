import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { sendOtpEmail } from '../../../utils/sendOtpEmail';

interface OTPLoginPayload {
  name: string;
  password: string;
}

interface VerifyOtpPayload {
  userId: string;
  otp: string;
}

const requestLoginOtp = async (payload: OTPLoginPayload) => {
  const user = await User.isUserExistsByCustomId(payload.name);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'Invalid username or password');
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, 'Account deleted');

  const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
  if (!isPasswordMatched) throw new AppError(httpStatus.FORBIDDEN, 'Invalid username or password');

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await User.findByIdAndUpdate(user._id, { otpCode: otp, otpExpiresAt });

  if (user.email) {
    await sendOtpEmail(user.email, user.name, otp);
  }

  return { message: 'OTP sent successfully', userId: user._id };
};

const verifyLoginOtp = async (payload: VerifyOtpPayload) => {
  console.log('payload request', payload)
  const user = await User.findById(payload.userId).select('+otpCode +otpExpiresAt +password');
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (!user.otpCode || !user.otpExpiresAt)
    throw new AppError(httpStatus.BAD_REQUEST, 'OTP not requested');

  if (user.otpExpiresAt < new Date())
    throw new AppError(httpStatus.FORBIDDEN, 'OTP expired');
  console.log('use check for otp', user)
  if (user.otpCode !== payload.otp)
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid OTP');

  await User.findByIdAndUpdate(user._id, { otpCode: null, otpExpiresAt: null });

  const jwtPayload = { userId: user._id.toString(), role: user.role, name: user.name };
  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);

  return {
    accessToken,
    refreshToken,
    user: { userId: user._id, name: user.name, role: user.role, token: accessToken },
  };
};

const refreshToken = async (token: string) => {
  let decodedData: JwtPayload;
  try {
    decodedData = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired refresh token!');
  }

  const { userId } = decodedData;
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, 'Account deleted');

  const newAccessToken = createToken(
    { userId: user._id.toString(), role: user.role, name: user.name },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const AuthServices = {
  requestLoginOtp,
  verifyLoginOtp,
  refreshToken,
};
