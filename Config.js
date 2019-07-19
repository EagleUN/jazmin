const config = require("nconf");
const path = require("path");

config
  .argv()
  .env()
  .file({
    file: path.resolve("./config.json"),
  });

config.defaults({});

module.exports = config;

