const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

class JWT {
  constructor(privateKey, expiresIn = "1h") {
    this.privateKey = privateKey;
    this.signOptions = { expiresIn };
  }

  async sign(payload) {
    return sign(payload, this.privateKey, this.signOptions);
  }

  async verify(token) {
    return verify(token, this.privateKey);
  }
}

module.exports = {
  JWT,
};
