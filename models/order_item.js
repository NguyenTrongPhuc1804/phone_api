"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bill, Product }) {
      this.belongsTo(Bill, { foreignKey: "order_id", as: "order_items" });
      this.belongsTo(Product, { foreignKey: "product_id", as: "product" });
      // define association here
    }
  }
  Order_item.init(
    {
      order_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
