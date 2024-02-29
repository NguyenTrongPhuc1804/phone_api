const { User } = require("../models");
const bcrypt = require("bcrypt");
var gravatar = require("gravatar");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const user = req.body;
  const findUser = await User.findOne({ where: { email: user.email } });
  if (findUser) {
    res.status(404).send({ message: "email already exists !!" });
    return;
  }
  var defaultAvatar = gravatar.url(
    user.email,
    { s: "100", r: "x", d: "retro" },
    false
  );
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(user.password, salt);
  try {
    const account = await User.create({
      ...user,
      password: hashPassword,
      avatar: defaultAvatar,
    });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  try {
    if (!user) {
      res.status(404).send("wrong email or password");
      return;
    }
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      const token = jwt.sign(
        {
          user_id: user.id,
          name: user.name,
          email: user.email,
          author: user.author,
        },
        "phone_v1",
        { expiresIn: 60 * 60 }
      );
      res.status(200).send({ message: "login success", access_token: token });
    } else {
      res.status(404).send("wrong email or password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllUser = async (req, res) => {
  let { page, limit } = req.query;
  try {
    if (page) {
      const countPage = await User.count();
      page = page < 1 || isNaN(page) ? (page = 1) : parseInt(page);
      limit = isNaN(limit) ? countPage : parseInt(limit);
      const listUser = await User.findAll({
        offset: (page - 1) * limit,
        limit: limit,
      });
      res.status(200).send({
        data: listUser,
        totalPage: countPage / limit,
        currentPage: page,
        totalItem: countPage,
      });
    } else {
      const listUser = await User.findAll();
      res.status(200).send(listUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getUserDetail = async (req, res) => {
  const { user } = req;
  try {
    const userInfo = await User.findOne({
      where: {
        id: user.user_id,
      },
    });
    if (userInfo) {
      res.status(200).send(userInfo);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const deleteUSer = async (req, res) => {
  const { id } = req.params;
  try {
    const userDrop = await User.destroy({ where: { id: id } });
    console.log(userDrop);
    if (userDrop) {
      res.status(200).send({ message: "delete success user" + " " + id });
    } else {
      res.status(404).send({ message: "Not found user" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateUser = async (req, res) => {
  const { name, email, phone, author, password, address } = req.body;
  const { user } = req;
  const { id } = req.params;
  const { file } = req;
  try {
    const findUser = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (findUser) {
      // const salt = bcrypt.genSaltSync(10);
      // const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.update(
        {
          name,
          phone,
          author,
          email,
          address,
          // password: hashPassword,
          // avatar: `${process.env.HOST}/${file.path}`,
        },
        { where: { id: user.user_id } }
      );
      const userUpdate = await User.findOne({
        where: {
          email: email,
        },
      });
      res
        .status(200)
        .send({ message: "Update success user :" + " " + email, userUpdate });
    } else {
      res.status(404).send("Not found user");
    }
  } catch (error) {
    res.status(200).send(error);
    console.log(error);
  }
};
module.exports = {
  register,
  login,
  deleteUSer,
  getAllUser,
  getUserDetail,
  updateUser,
};
