import { getHashed, parseSequelizeErrors } from '../utils/helpers.mjs';
import { UserModel } from '../models/index.mjs';

export const createUser = async payload => {
  try {
    const hashedPassword = getHashed(payload.password);
    const object = UserModel.build({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });

    await object.save();

    return { data: { success: true, message: 'User created!' } };
  } catch (error) {
    console.error(error, '--failed user save');

    return { error: parseSequelizeErrors(error?.errors) ?? error?.message };
  }
};

export const getUsers = async () => {
  try {
    const data = await UserModel.findAll({
      attributes: {
        exclude: ['password'],
      },
    });

    // const data = await UserModel.destroy({
    //   truncate: true,
    //   cascade: true,
    // });

    return { data };
  } catch (error) {
    console.log(error);

    return { error };
  }
};

export const getUserById = async userId => {
  try {
    const data = await UserModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        id: userId,
      },
    });

    return data ? { data: data.dataValues } : { error: 'user not found!' };
  } catch (error) {
    console.log(error);

    return { error };
  }
};
