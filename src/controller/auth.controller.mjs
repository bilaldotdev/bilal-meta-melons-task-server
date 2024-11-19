import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/index.mjs';
import { JWT_TOKEN_SECRET } from '../config/index.mjs';

export const signIn = async ({ email, password }) => {
  const result = await UserModel.findOne({
    where: {
      email: email,
    },
  });

  if (result) {
    const { password: userPsd, ...userResult } = result.dataValues;
    const match = await bcrypt.compare(password, result?.password);

    if (match) {
      const { password, ...user } = userResult;
      const secret = `${JWT_TOKEN_SECRET}${userResult.password}`;

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: '30 days',
      });

      return { data: { ...userResult, token } };
    }
    return { error: 'Invalid email or password!' };
  }

  return { error: 'User not found!' };
};
