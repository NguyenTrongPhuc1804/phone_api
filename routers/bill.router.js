const express = require("express");
const {
  createBill,
  getAllBill,
  getBillByUser,
  getDetailBill,
} = require("../controllers/bill.controll");
const { Authenticate } = require("../middlewares/Auth/AuthMiddleware");
const Authorize = require("../middlewares/Auth/Author");
const billRouter = express.Router();
billRouter.post("/create", Authenticate, createBill);
billRouter.get("/", Authenticate, getAllBill);
billRouter.get("/user", Authenticate, getBillByUser);
billRouter.get("/:code", getDetailBill);
module.exports = billRouter;
