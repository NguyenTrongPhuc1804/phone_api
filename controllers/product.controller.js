const { Op } = require("sequelize");
const { Product, sequelize } = require("../models");

const createProduct = async (req, res) => {
  const {
    category_id,
    description,
    is_new = true,
    name,
    price,
    price_sale_off,
    rating,
    special,
    summary,
  } = req.body;
  const { file } = req;
  try {
    const newProduct = await Product.create({
      category_id: Number(category_id),
      description,
      is_new: is_new == "true" ? true : false,
      name,
      price: Number(price),
      price_sale_off: Number(price_sale_off),
      rating: Number(rating),
      special: special == "true" ? true : false,
      summary,
      image: `${process.env.HOST}/${file.path}`,
    });
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const getAllProduct = async (req, res) => {
  const {
    order = "asc",
    sortBy,
    min_price = 0,
    max_price = 999999999,
    special,
    is_new,
  } = req.query;
  try {
    if (sortBy) {
      if (special) {
        const [listProduct] = await sequelize.query(`
        SELECT * from phone_api.Products
        where ${sortBy} and special= ${special} 
        order by ${sortBy} ${order}
        `);
        res.status(200).send(listProduct);
      } else {
        const [listProduct] = await sequelize.query(`
        SELECT * from phone_api.Products
        where  ${sortBy} between ${min_price} and ${max_price}
        order by ${sortBy} ${order}
        `);
        res.status(200).send(listProduct);
      }
    } else {
      const listProduct = await Product.findAll();
      res.status(200).send(listProduct);
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const getDetailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Not found!!" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const data = req.body;
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  try {
    if (product) {
      const productUpdate = await Product.update(
        { ...data, image: `${process.env.HOST}/${file.path}` },
        { where: { id } }
      );
      const newProduct = await Product.findOne({
        where: {
          id,
        },
      });
      console.log(productUpdate);
      res.status(200).send({ message: "update success", newProduct });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const deteleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    if (product) {
      const dropProduct = await Product.destroy({ where: { id } });
      res.status(200).send({ message: `detele success product id ${id}` });
    } else {
      res.status(404).send({ message: "Not found product!!" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deteleProduct,
  getDetailProduct,
};
