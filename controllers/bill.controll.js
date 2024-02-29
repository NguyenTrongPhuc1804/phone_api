const crypto = require("crypto");
const { Bill, Order_item, Product } = require("../models");
const { genarateCode } = require("../utils/toolkit");
const createBill = async (req, res) => {
  const { data } = req.body;
  const { user } = req;
  const code = genarateCode(12);
  // tìm và map database và request lại với nhau
  console.log(data, "data map");
  const proId = data.map((item) => item.product_id);
  const listProduct = await Product.findAll({ where: { id: proId } });
  const newlistProduct = data.map((product) => {
    const product2 = listProduct.find(
      (item2) => item2.id == product.product_id
    );
    if (product2) {
      const amount = product2.dataValues.price_sale_off * product.quantity;
      return { ...product, price: product2.dataValues.price_sale_off, amount };
    }
  });
  try {
    const amount = newlistProduct.reduce((pre, next) => pre + next.amount, 0);
    const newBill = await Bill.create({ code, user_id: user.user_id, amount });
    const newOrder_item = await Order_item.bulkCreate(
      newlistProduct.map((item) => ({
        ...item,
        order_id: newBill.id,
      }))
    );
    const bill = await Bill.findOne({ where: { id: newBill.id } });
    res.status(201).send({ ...bill.dataValues, order_items: newOrder_item });
    // res.send(newlistProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getAllBill = async (req, res) => {
  let { page, limit } = req.query;
  try {
    if (page) {
      page = page < 1 ? (page = 1) : parseInt(page);
      limit = parseInt(limit);
      const listBill = await Bill.findAll({
        include: {
          model: Order_item,
          as: "order_items",
          // include: {
          //   model: Product,
          //   as: "product",
          // },
        },
        offset: (page - 1) * limit,
        limit: limit,
      });
      res.status(200).send(listBill);
    } else {
      const listBill = await Bill.findAll();
      res.status(200).send(listBill);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getBillByUser = async (req, res) => {
  let { page, limit } = req.query;
  const { user } = req;
  try {
    if (page) {
      page = page < 1 ? (page = 1) : parseInt(page);
      limit = parseInt(limit);
      const listBill = await Bill.findAll({
        where: {
          user_id: user.user_id,
        },
        include: {
          model: Order_item,
          as: "order_items",
          // include: {
          //   model: Product,
          //   as: "product",
          // },
        },
        offset: (page - 1) * limit,
        limit: limit,
      });
      const countPage = await Bill.count({
        where: {
          user_id: user.user_id,
        },
      });
      res.status(200).send({
        listBill,
        totalPage: countPage / limit,
        currentPage: page,
        totalItem: countPage,
      });
    } else {
      const listBill = await Bill.findAll({
        include: {
          model: Order_item,
          as: "order_items",
          // include: {
          //   model: Product,
          //   as: "product",
          // },
        },
      });
      res.status(200).send(listBill);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getDetailBill = async (req, res) => {
  const { code } = req.params;
  console.log(code);
  try {
    const bill = await Bill.findOne({ where: { code } });
    if (bill) {
      const billDetail = await Bill.findOne({
        where: { code },
        include: { model: Order_item, as: "order_items" },
      });
      res.status(200).send(billDetail);
    } else {
      res.status(404).send("Not found bill !!");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
module.exports = {
  createBill,
  getAllBill,
  getBillByUser,
  getDetailBill,
};
