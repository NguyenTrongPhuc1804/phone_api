const { Product } = require("../../models");
const fs = require("fs");
const path = require("path");
const removeImage = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  const regex = /http:\/\/localhost:3000\/(.*)/;
  const match = product.image.match(regex);
  const filePath = path.join(__dirname, `../../${match[1]}`);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Lỗi khi xóa tập tin:", err);
      res.status(500).send(err);
      return;
    }
    console.log("Đã xóa tập tin thành công:", filePath);
    next();
  });
};

module.exports = removeImage;
