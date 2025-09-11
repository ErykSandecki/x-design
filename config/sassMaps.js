const boxShadow = require('./sass/maps/boxShadow');
const colorsTheme = require('./sass/maps/colorsTheme');
const zIndex = require('./sass/maps/zIndex');

const interpolateIntoSass = (obj, mapName) => {
  const prefix = '$--xd-';
  const sufix = '-map';
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    keys.push(`${key}: ${value}`);
  }

  return `${prefix}${mapName}${sufix}: (${keys.join(',')});`;
};

module.exports = () =>
  [
    interpolateIntoSass(boxShadow(true), 'box-shadow'),
    interpolateIntoSass(colorsTheme.dark, 'colors-dark'),
    interpolateIntoSass(colorsTheme.light, 'colors-light'),
    interpolateIntoSass(zIndex, 'z-indexes'),
  ].join(' ');
