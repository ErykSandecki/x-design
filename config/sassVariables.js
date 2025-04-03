const boxShadows = require('./sass/variables/boxShadows');
const colors = require('./sass/variables/colors');
const constants = require('./constants/constants');

const interpolateIntoSass = (obj, isTheme) => {
  const prefix = constants.prefix;
  const variables = [];

  for (const [key, value] of Object.entries(obj)) {
    const close = isTheme ? ',' : ';';
    const withPrefix = isTheme ? '' : prefix;
    const unit = value.$type === 'number' ? 'px' : '';

    variables.push(`${withPrefix}${key}: ${value.$value}${unit}${close}`);
  }

  return isTheme
    ? `${prefix}${isTheme}-theme: (${variables.join(' ')});`
    : variables.join(' ');
};

module.exports = () =>
  [
    interpolateIntoSass(boxShadows),
    interpolateIntoSass(colors),
    interpolateIntoSass(colors, 'colors'),
  ].join(' ');
