const NodemonPlugin = require("nodemon-webpack-plugin"); // Ding

const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/script/script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "var",
    library: "noBQuestion",
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
};
