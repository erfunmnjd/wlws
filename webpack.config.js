// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const webpack = require("webpack");
const isProduction = process.env.NODE_ENV === "production";
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

/** @type {import("webpack").Configuration} */
const config = {
  entry: {
    signupStandAlone: "./src/js/signupStandAlone.js",
    signupWithButton: "./src/js/signupWithButton.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "src/js/output"),
  },
  resolve: {
    extensions: [".js", ".json", ".php", ".css"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Alpine: ["alpinejs", "default"],
    }),
    new BrowserSyncPlugin(
      {
        watch: true,
        host: "localhost",
        port: 3000,
        files: ["./includes/**/*.php"],
        proxy: "http://127.0.0.1/lattio/",
      },
      { reload: true },
    ),

    false,
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
