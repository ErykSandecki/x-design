const fs = require('fs');
const { camelCase } = require('lodash');

const testFolder = './config/sass/maps';

const generateEnumsSass = (variableName, variables) => {
  const parsedVariables = [];

  for (const [key] of Object.entries(variables)) {
    parsedVariables.push(`${camelCase(key)} = '${camelCase(key)}'`);
  }

  return `export enum ${variableName} { ${parsedVariables.sort().join(',')} }`;
};

fs.readdir(testFolder, (_, files) => {
  files.forEach((file) => {
    const [fileName] = file.split('.');
    const stream = fs.createWriteStream(
      `./src/types/enums/scss/${fileName}.ts`,
    );
    const variables = require(`../config/sass/maps/${fileName}`);
    const variableName = `${fileName[0].toUpperCase()}${fileName.substring(1)}`;

    stream.once('open', function () {
      stream.write(generateEnumsSass(variableName, variables.keys));
      stream.end();
    });
  });
});
