import config from "nconf";
import path from "path";

config
  .argv()
  .env()
  .file({
    file: path.resolve("./config.json"),
  });

config.defaults({});

export default config;

