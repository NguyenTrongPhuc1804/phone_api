const { Op } = require("sequelize");
const { Category, sequelize } = require("../models");
const { Product } = require("../models");
require("dotenv").config();
const createCategory = async (req, res) => {
  const { name } = req.body;
  const { file } = req;
  try {
    const newCate = await Category.create({
      name,
      image: `${process.env.HOST}/${file.path}`,
    });
    res.status(201).send(newCate);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllCategory = async (req, res) => {
  let { page, limit, min_price, max_price } = req.query;
  try {
    if (page) {
      const countPage = await Category.count();
      page = page < 1 || isNaN(page) ? (page = 1) : parseInt(page);
      limit = isNaN(limit) ? countPage : parseInt(limit);
      const listCate = await Category.findAll({
        offset: (page - 1) * limit,
        limit: limit,
      });
      res.status(200).send({
        data: listCate,
        totalPage: countPage / limit,
        currentPage: page,
        totalItem: countPage,
      });
    } else {
      const listCate = await Category.findAll({
        where: null,
      });
      res.status(200).send(listCate);
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const getDetailCAtegory = async (req, res) => {
  const { id } = req.params;
  try {
    const cate = await Category.findOne({ where: { id } });
    if (cate) {
      res.status(200).send(cate);
    } else {
      res.status(404).send({ message: "Not found !!" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { file } = req;
  const cate = await Category.findOne({ where: { id } });
  try {
    if (cate) {
      const newCate = await Category.update(
        {
          name,
          image: `${process.env.HOST}/${file.path}`,
        },
        { where: { id } }
      );
      const cateUpdate = await Category.findOne({ where: { id } });
      res.status(200).send(cateUpdate);
    } else {
      res.status(404).send({ message: "Category not found !!" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const cate = await Category.findByPk(id);
  try {
    if (cate) {
      const dropCate = await Category.destroy({ where: { id } });
      res.status(200).send({ message: "delete success category" + " " + id });
    } else {
      res.status(404).send({ message: `Not found category by id ${id}` });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const getListProductbyId = async (req, res) => {
  const { id } = req.params;
  const {
    order = "asc",
    sortBy,
    min_price,
    max_price,
    special,
    is_new,
  } = req.query;
  try {
    if (min_price && max_price) {
      const [listProduct] = await sequelize.query(`
      SELECT * from phone_api.Products
      where category_id =${id} and ${sortBy} between ${min_price} and ${max_price}
      order by ${sortBy} ${order}
      `);
      res.status(200).send(listProduct);
    } else {
      const listProduct = await Product.findAll();
      res.status(200).send(listProduct);
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getDetailCAtegory,
  updateCategory,
  deleteCategory,
  getListProductbyId,
};
