"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order_item }) {
      this.hasMany(Order_item, { foreignKey: "order_id", as: "order_items" });
      // define association here
    }
  }
  Bill.init(
    {
      amount: DataTypes.INTEGER,
      code: DataTypes.STRING,
      status: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
