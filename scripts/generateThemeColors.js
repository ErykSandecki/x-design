const fs = require('fs');
const themes = require('../config/constants/themes.js');
const { camelCase } = require('lodash');

const getKey = (key, theme) => camelCase(key.replace(theme, ''));

const getThemeColors = (colors) => {
  const themeVariables = { [themes[0]]: [], [themes[1]]: [] };

  for (const [key, value] of Object.entries(colors)) {
    const { $value } = value;
    const [dark, light] = themes;

    switch (true) {
      case key.includes(dark):
        themeVariables[dark].push(`${getKey(key, dark)}: '${$value}'`);
        break;
      case key.includes(light):
        themeVariables[light].push(`${getKey(key, light)}: '${$value}'`);
        break;
      default:
        themeVariables[dark].push(`${getKey(key, dark)}: '${$value}'`);
        themeVariables[light].push(`${getKey(key, light)}: '${$value}'`);
        break;
    }
  }

  return themeVariables;
};

const getThemeVariable = (theme, themeColors) =>
  `${theme}: { ${themeColors[theme].sort().join(',')} }`;

const generateThemeColors = (colors) => {
  const themeColors = getThemeColors(colors);
  const variableName = 'THEME_COLORS';
  const obj = themes.map((theme) => getThemeVariable(theme, themeColors));

  return `export const ${variableName} = { ${obj.join(',')} }`;
};

fs.readFile('./config/sass/variables/colors.js', 'utf8', () => {
  const stream = fs.createWriteStream(`./src/constant/themeColors.ts`);
  const colors = require(`../config/sass/variables/colors.js`);

  stream.once('open', function () {
    stream.write(generateThemeColors(colors));
    stream.end();
  });
});
