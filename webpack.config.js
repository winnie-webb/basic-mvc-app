const path = require("path");

module.exports = {
  output: {
    filename: "main.js",
    path: path.join(__dirname, "/public", "js"),
  },
};
