'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const webpackConfig = require('./webpack.config');

module.exports = {
  ...webpackConfig,
  stats: 'none',
  devtool: 'cheap-module-source-map',
  output: {
    ...webpackConfig.output,
    chunkFilename: 'static/js/[name].chunk.js',
    filename: 'static/js/bundle.js',
    pathinfo: true,
  },
  plugins: [
    ...webpackConfig.plugins,
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
        },
      ),
    ),
  ],
};
