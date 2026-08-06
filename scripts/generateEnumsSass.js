const fs = require('fs');
const { camelCase } = require('lodash');

const testFolder = './config/sass/maps';

const generateEnum = (parsedVariables, variableName) =>
  `export enum ${variableName} { ${parsedVariables.sort().join(',')} }`;

const generateEnumsSass = (variableName, variables) => {
  const parsedVariables = [];

  for (const [key, value] of Object.entries(variables)) {
    parsedVariables.push(`${camelCase(key)} = '${value}'`);
  }

  return generateEnum(parsedVariables, variableName);
};

fs.readdir(testFolder, (_, files) => {
  files.forEach((file) => {
    const [fileName] = file.split('.');
    const stream = fs.createWriteStream(`./src/types/enums/scss/${fileName}.ts`);
    const variables = require(`../config/sass/maps/${fileName}`);
    const variableName = `${fileName[0].toUpperCase()}${fileName.substring(1)}`;

    switch (fileName) {
      case 'boxShadow':
        stream.once('open', function () {
          stream.write(generateEnumsSass(variableName, variables(false)));
          stream.end();
        });
        break;
      default:
        stream.once('open', function () {
          stream.write(generateEnumsSass(variableName, variables));
          stream.end();
        });
        break;
    }
  });
});
