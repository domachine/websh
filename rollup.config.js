const fs = require("fs");

const banner = fs.readFileSync("./banner.js", "utf-8");

export default {
  input: "src/Websh.js",
  output: {
    format: "esm",
    banner
  }
};
