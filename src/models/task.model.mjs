import { DataTypes, Sequelize } from 'sequelize';

const low = 'low';
const pending = 'pending';

const priorities = [low, 'medium', 'high'];
const statuses = [pending, 'in_progress', 'completed'];

/**
 * @argument {Sequelize} sequelize
 */
const Task = sequelize => {
  return sequelize.define(
    'task',
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [statuses],
        },
        defaultValue: pending,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [priorities],
        defaultValue: low,
      },
    },
    {
      createdAt: true,
      freezeTableName: true,
    }
  );
};

export default Task;
