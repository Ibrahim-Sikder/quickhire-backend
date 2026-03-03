/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email or password');
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This account has been deleted!');
  }


  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid email or password');
  }

  const JwtPayload = {
    userId: user?._id as unknown as string,
    role: user?.role,
    email: user?.email,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
      token: accessToken,
    },
  };
};




export const AuthServices = {
  loginUser,


};
