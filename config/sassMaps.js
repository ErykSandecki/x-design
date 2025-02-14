const colorsTheme = require('./sass/maps/colorsThemes');

const interpolateIntoSass = (obj, mapName) => {
  const prefix = '$--rx-';
  const sufix = '-map';
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    keys.push(`${key}: ${value}`);
  }

  return `${prefix}${mapName}${sufix}: (${keys.join(',')});`;
};

module.exports = () =>
  [
    interpolateIntoSass(colorsTheme.dark, 'colors-dark'),
    interpolateIntoSass(colorsTheme.light, 'colors-light'),
  ].join(' ');
