const boxShadows = require('./sass/variables/boxShadows');
const colors = require('./sass/variables/colors');
const constants = require('./constants/constants');

const interpolateIntoSass = (obj) => {
  const prefix = constants.prefix;
  const variables = [];

  for (const [key, value] of Object.entries(obj)) {
    const close = ';';
    const unit = value.$type === 'number' ? 'px' : '';
    const variable = `${prefix}${key}`;

    variables.push(`${variable}: ${value.$value}${unit}${close}`);
  }

  return variables.join(' ');
};

module.exports = () =>
  [interpolateIntoSass(boxShadows), interpolateIntoSass(colors)].join(' ');
