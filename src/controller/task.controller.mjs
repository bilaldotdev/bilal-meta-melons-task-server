import { TaskModel } from '../models/index.mjs';
import { parseSequelizeErrors } from '../utils/helpers.mjs';

export const createTask = async (payload, userId) => {
  try {
    const object = TaskModel.build({
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      status: payload.status,
      userId: userId,
    });

    const obj = await object.save();

    return { data: obj.dataValues };
  } catch (error) {
    console.error(error, '--failed Task save');

    return { error: parseSequelizeErrors(error?.errors) ?? error?.message };
  }
};

export const getTasks = async userId => {
  try {
    const data = await TaskModel.findAll({
      where: {
        userId: userId,
      },
    });

    return { data };
  } catch (error) {
    console.log(error);

    return { error };
  }
};

export const getTaskById = async taskId => {
  try {
    const data = await TaskModel.findOne({
      where: {
        id: taskId,
      },
    });

    return data ? { data: data.dataValues } : { error: 'Task not found!' };
  } catch (error) {
    console.log(error);

    return { error };
  }
};

export const delTaskById = async taskId => {
  try {
    const count = await TaskModel.destroy({
      where: {
        id: taskId,
      },
    });

    return count ? { data: 'Task deleted!' } : { error: 'Task not found!' };
  } catch (error) {
    console.log(error);

    return { error };
  }
};

export const updateTaskById = async (taskId, data = {}) => {
  try {
    const count = await TaskModel.update(data, {
      where: {
        id: taskId,
      },
      validate: true,
    });

    return count ? { data: 'Task updated!' } : { error: 'Task not found!' };
  } catch (error) {
    console.log(error);

    return { error };
  }
};
