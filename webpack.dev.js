import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"], // Forces reload when HTML changes
  },
});
