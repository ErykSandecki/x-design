const colors = require('./sass/variables/colors');

const interpolateIntoSass = (obj, mapName) => {
  const prefix = '$--rx-';
  const variables = [];
  const withTheme = !!mapName;

  for (const [key, value] of Object.entries(obj)) {
    const close = withTheme ? ',' : ';';
    const withPrefix = withTheme ? '' : prefix;
    const unit = value.$type === 'number' ? 'px' : '';

    variables.push(`${withPrefix}${key}: ${value.$value}${unit}${close}`);
  }

  return withTheme
    ? `${prefix}${mapName}-theme: (${variables.join(' ')});`
    : variables.join(' ');
};

module.exports = () =>
  [interpolateIntoSass(colors), interpolateIntoSass(colors, 'colors')].join(
    ' ',
  );
