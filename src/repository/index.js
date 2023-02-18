const MongoDB = require("./mongodb");
const errors = require("./error");

module.exports = {
  MongoDB,
  ...errors,
};
