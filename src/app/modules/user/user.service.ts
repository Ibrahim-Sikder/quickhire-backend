/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const creatUser = async (payload: TUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already exist!');
  }

  const result = await User.create(payload);
  return result;
};
const getAllUser = async () => {
  const result = await User.find();
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ _id: id });

  return result;
};


export const UserServices = {
  creatUser,
  getAllUser,
  deleteUser
};
