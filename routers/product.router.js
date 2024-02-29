const express = require("express");
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deteleProduct,
  getDetailProduct,
} = require("../controllers/product.controller");
const uploadImage = require("../middlewares/upload/uploadImage");
const removeImage = require("../middlewares/upload/removeImage");
const ProductRouter = express.Router();
ProductRouter.post(
  "/create",
  uploadImage("image", "productImage"),
  createProduct
);
ProductRouter.get("/", getAllProduct);
ProductRouter.get("/:id", getDetailProduct);
ProductRouter.put(
  "/update/:id",
  removeImage,
  uploadImage("image", "productImage"),
  updateProduct
);
ProductRouter.delete("/delete/:id", deteleProduct);
module.exports = ProductRouter;
