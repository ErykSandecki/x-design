const fs = require('fs');
const { camelCase } = require('lodash');

const testFolder = './config/sass/maps';

const generateMapsSass = (variableName, variables) => {
  const parsedVariables = [];

  for (const [key] of Object.entries(variables)) {
    parsedVariables.push(`${camelCase(key)} = '${key}'`);
  }

  return `export enum ${variableName} { ${parsedVariables.sort().join(',')} }`;
};

fs.readdir(testFolder, (_, files) => {
  files.forEach((file) => {
    const [fileName] = file.split('.');
    const name = fileName.substring(0, fileName.length - 1);
    const stream = fs.createWriteStream(`./src/constant/scss/maps/${name}.ts`);
    const variables = require(`../config/sass/maps/${fileName}`);
    const variableName = `${name[0].toUpperCase()}${name.substring(1)}`;

    stream.once('open', function () {
      stream.write(generateMapsSass(variableName, variables.keys));
      stream.end();
    });
  });
});
