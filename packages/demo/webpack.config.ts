import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration } from "webpack";

const demos: string[] = require("./demo.json");

const config: Configuration = {
  mode: "development",
  entry: Object.fromEntries(
    demos.map((demo: string) => [demo, `./demo.${demo}`])
  ),
  resolve: { extensions: [".ts", ".js"] },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[contenthash].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          compilerOptions: {
            lib: ["dom", "es2020"],
            target: "es5",
          },
        },
      },
    ],
  },
  plugins: [
    ...demos.map(
      (demo) =>
        new HtmlWebpackPlugin({
          title: "snk - " + demo,
          filename: `${demo}.html`,
          chunks: [demo],
        })
    ),
  ],

  devtool: false,
  stats: "errors-only",
};

export default config;
