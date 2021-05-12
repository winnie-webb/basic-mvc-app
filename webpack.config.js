const path = require("path");

module.exports = {
  entry: ["./public/js/barba-init.js", "./public/js/myCustomAnimation.js"],
  output: {
    filename: "main.js",
    path: path.join(__dirname, "/public", "js"),
  },
};
