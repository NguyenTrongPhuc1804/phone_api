const express = require("express");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const ProductRouter = require("./product.router");
const billRouter = require("./bill.router");
const pdfRouter = require("./pdf.router");
const { screenShot } = require("../controllers/buildPdf.controller");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/product", ProductRouter);
rootRouter.use("/bill", billRouter);
rootRouter.use("/pdf", pdfRouter);

module.exports = rootRouter;
