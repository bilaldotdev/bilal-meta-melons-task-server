import Task from './task.model.mjs';
import User from './user.model.mjs';
import { getSequelize } from '../lib/connect-db.mjs';

const UserModel = User(getSequelize());
const TaskModel = Task(getSequelize());

UserModel.hasMany(TaskModel, { foreignKey: 'userId', onDelete: 'CASCADE' });
TaskModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

export { UserModel, TaskModel };
