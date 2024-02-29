const express = require("express");
const {
  register,
  login,
  deleteUSer,
  getAllUser,
  getUserDetail,
  updateUser,
} = require("../controllers/user.controller");
const { Authenticate } = require("../middlewares/Auth/AuthMiddleware");
const Authorize = require("../middlewares/Auth/Author");
const uploadImageCate = require("../middlewares/upload/uploadImage");
const uploadImage = require("../middlewares/upload/uploadImage");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getAllUser);
userRouter.get(
  "/me",
  Authenticate,
  Authorize(["ADMIN", "SUPER_ADMIN", "CLIENT"]),
  getUserDetail
);
userRouter.put(
  "/update/",
  Authenticate,
  uploadImage("avatar", "userAvatar"),
  updateUser
);
userRouter.delete(
  "/delete/:id",
  Authenticate,
  Authorize(["ADMIN", "SUPER_ADMIN", "CLIENT"]),
  deleteUSer
);

module.exports = userRouter;
