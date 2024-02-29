"use strict";
const { Model } = require("sequelize");
const {
  notNullValidate,
  isEmailValidate,
  notEmptyValidate,
} = require("../utils/validateVariable");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Không được để trống tên",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
        defaultValue: "CLIENT",
      },
      password: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
