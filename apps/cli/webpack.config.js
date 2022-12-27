const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const moduleRules = [
  {
    test: /\.ts$/,
    use: "ts-loader",
    exclude: path.resolve(__dirname, "node_modules"),
  },
];

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.BannerPlugin({
    banner: "#!/usr/bin/env node",
    raw: true,
  }),
  new webpack.IgnorePlugin({
    resourceRegExp: /^encoding$/,
    contextRegExp: /node-fetch/,
  }),
  new webpack.IgnorePlugin({
    resourceRegExp: /canvas/,
    contextRegExp: /jsdom$/,
  }),
];

const webpackConfig = {
  mode: "production",
  target: "node",
  devtool: "source-map",
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    uab: "./src/index.ts",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
    symlinks: false,
    modules: [path.resolve("../../node_modules")],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  module: { rules: moduleRules },
  plugins: plugins,
  externals: [
    nodeExternals({
      modulesDir: "./node_modules",
      allowlist: [/@uabmagic/],
    }),
  ],
};

module.exports = webpackConfig;
