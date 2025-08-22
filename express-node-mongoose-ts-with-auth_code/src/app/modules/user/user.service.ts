import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

// post
const createUserInfoDB = async (user: TUser) => {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }

  const result = await User.create(user);
  return result;
};

// get
const gelAllUsersFromDB = async () => {
  const users = await User.find({});
  return users;
};

export const UserServices = {
  createUserInfoDB,
  gelAllUsersFromDB,
};
