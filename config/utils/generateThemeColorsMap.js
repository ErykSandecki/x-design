const themes = require('../constants/themes');

const generateThemeColorsMap = (colors) => {
  const colorsMap = {
    [themes[0]]: {},
    [themes[1]]: {},
    keys: {},
  };

  themes.forEach((theme) => {
    const modificator = '--';

    for (const [key, value] of Object.entries(colors)) {
      const includeModificator = key.includes(modificator);
      const includeTheme = key.includes(theme);
      const keyWithoutModificator = key.split(modificator)[0];

      if (!includeModificator || (includeModificator && includeTheme)) {
        colorsMap[theme][keyWithoutModificator] = value.$value;
      }

      if (!colorsMap[keyWithoutModificator]) {
        colorsMap.keys[keyWithoutModificator] = keyWithoutModificator;
      }
    }
  });

  return colorsMap;
};

module.exports = generateThemeColorsMap;
