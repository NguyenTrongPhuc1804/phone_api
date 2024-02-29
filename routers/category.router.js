const express = require("express");
const {
  createCategory,
  getAllCategory,
  getDetailCAtegory,
  updateCategory,
  deleteCategory,
  getListProductbyId,
} = require("../controllers/category.controller");
const uploadImageCate = require("../middlewares/upload/uploadImage");
const uploadImage = require("../middlewares/upload/uploadImage");
const removeImage = require("../middlewares/upload/removeImage");
const categoryRouter = express.Router();
categoryRouter.post(
  "/create",
  uploadImageCate("image", "category"),
  createCategory
);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getDetailCAtegory);
categoryRouter.put(
  "/update/:id",
  removeImage,
  uploadImage("image", "category"),
  updateCategory
);
categoryRouter.delete("/delete/:id", deleteCategory);
categoryRouter.get("/:id/product", getListProductbyId);
module.exports = categoryRouter;
