'use strict';

const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('./paths');

module.exports = () => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  historyApiFallback: true,
  static: {
    directory: paths.appPublic,
    publicPath: [paths.publicUrlOrPath],
    watch: {
      ignored: ignoredFiles(paths.appSrc),
    },
  },
});
