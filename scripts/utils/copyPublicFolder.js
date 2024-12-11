const fs = require('fs-extra');

const paths = require('../../config/paths');

module.exports = () => {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
};
