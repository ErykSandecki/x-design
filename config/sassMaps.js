const typographyColor = require('./sass/maps/typographyColors');

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
    interpolateIntoSass(typographyColor.dark, 'font-colors-dark'),
    interpolateIntoSass(typographyColor.light, 'font-colors-light'),
  ].join(' ');
