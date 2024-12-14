import { DataTypes, Sequelize } from 'sequelize';

/**
 * @argument {Sequelize} sequelize
 */
const User = sequelize => {
  return sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        /* will be a hashed password */
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};

export default User;
