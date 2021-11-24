'use strict';

const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'A first Name is required' },
          notEmpty: {
            msg: 'Please provide a valid "First Name"',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'A last Name is required' },
          notEmpty: {
            msg: 'Please provide a valid "Last Name"',
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email you entered already exist',
        },
        validate: {
          notNull: {
            msg: 'A email is required',
          },
          isEmail: {
            msg: 'Please provide a valid "Email Address"',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'A last Password is required' },
          notEmpty: {
            msg: 'Please provide a valid "Password"',
          },
          len: {
            args: [6, 20],
            msg: 'Password must be between 6-20 characters.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Users',

      hooks: {
        afterValidate: function (user) {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  ),
    (Users.associate = (models) => {
      Users.hasMany(models.Courses, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    });
  return Users;
};
