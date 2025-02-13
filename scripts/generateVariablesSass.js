const fs = require('fs');
const { camelCase, snakeCase } = require('lodash');

const testFolder = './config/sass/variables';

const generateVariablesSass = (name, variables) => {
  const parsedVariables = [];
  const variableName = snakeCase(name).toUpperCase();

  for (const [key, value] of Object.entries(variables)) {
    parsedVariables.push(`${camelCase(key)}: '${value.$value}'`);
  }

  return `export const ${variableName} = { ${parsedVariables.sort().join(',')} } as const`;
};

fs.readdir(testFolder, (_, files) => {
  files.forEach((file) => {
    const [name] = file.split('.');
    const stream = fs.createWriteStream(
      `./src/constant/scss/variables/${name}.ts`,
    );
    const variables = require(`../config/sass/variables/${name}`);

    stream.once('open', function () {
      stream.write(generateVariablesSass(name, variables));
      stream.end();
    });
  });
});
