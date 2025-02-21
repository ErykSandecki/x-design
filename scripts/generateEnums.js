const fs = require('fs');

const testFolder = './config/constants';

const excludeFiles = ['constants'];

const generateEnums = (variableName, keys) => {
  const parsedKeys = [];

  keys.forEach((key) => {
    parsedKeys.push(`${key} = '${key}'`);
  });

  return `export enum ${variableName} { ${parsedKeys.sort().join(',')} }`;
};

fs.readdir(testFolder, (_, files) => {
  files.forEach((file) => {
    const [fileName] = file.split('.');

    if (!excludeFiles.includes(fileName)) {
      const name = fileName.substring(0, fileName.length - 1);
      const stream = fs.createWriteStream(`./src/types/enums/${name}.ts`);
      const keys = require(`../config/constants/${fileName}`);
      const variableName = `${name[0].toUpperCase()}${name.substring(1)}`;

      stream.once('open', function () {
        stream.write(generateEnums(variableName, keys));
        stream.end();
      });
    }
  });
});
