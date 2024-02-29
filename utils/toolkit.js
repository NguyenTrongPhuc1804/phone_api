const crypto = require("crypto");
const genarateCode = function generateRandomCode(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

module.exports = {
  genarateCode,
};
