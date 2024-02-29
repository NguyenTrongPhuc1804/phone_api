"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Order_item }) {
      this.belongsTo(Category, {
        foreignKey: "category_id",
        as: "filter_product",
      });
      this.hasMany(Order_item, { foreignKey: "product_id", as: "product" });
      // define association here
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      is_new: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      price_sale_off: DataTypes.FLOAT,
      rating: DataTypes.INTEGER,
      special: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      summary: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
