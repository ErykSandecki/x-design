const fs = require('fs');
const path = require('path');

const sassList = require('./sassList');
const sassMaps = require('./sassMaps');
const sassMixins = require('./sassMixins');
const sassVariables = require('./sassVariables');

const generatedDir = path.resolve(__dirname, 'generated');
const generatedFile = path.resolve(generatedDir, '_xd-variables.scss');

const writeSassVariables = () => {
  fs.mkdirSync(generatedDir, { recursive: true });
  fs.writeFileSync(generatedFile, [sassList, sassVariables(), sassMaps(), sassMixins].join('\n'));
};

module.exports = writeSassVariables;
