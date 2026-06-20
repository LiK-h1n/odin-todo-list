import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true, // Clears the dist folder before every build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Handles CSS imports
      },
      {
        test: /\.html$/i,
        use: ["html-loader"], // Handles images hard-coded in HTML
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // Handles images imported in JS
      },
    ],
  },
};
