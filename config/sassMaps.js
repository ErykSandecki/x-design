const boxShadow = require('./sass/maps/boxShadow');
const constants = require('./constants/constants');
const zIndex = require('./sass/maps/zIndex');

const interpolateIntoSass = (obj, mapName) => {
  const prefix = constants.prefix;
  const sufix = '-map';
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    keys.push(`${key}: ${value}`);
  }

  return `${prefix}${mapName}${sufix}: (${keys.join(',')});`;
};

module.exports = () =>
  [interpolateIntoSass(boxShadow(true), 'box-shadow'), interpolateIntoSass(zIndex, 'z-indexes')].join(' ');
