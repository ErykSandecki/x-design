const colors = require('./sass/variables/colors');

const interpolateIntoSass = (obj, mapName) => {
  const prefix = '$--cth-';
  const variables = [];
  const isMap = !!mapName;

  for (const [key, value] of Object.entries(obj)) {
    const close = isMap ? ',' : ';';
    const withPrefix = isMap ? '' : prefix;
    const unit = value.$type === 'number' ? 'px' : '';

    variables.push(`${withPrefix}${key}: ${value.$value}${unit}${close}`);
  }

  return isMap
    ? `${prefix}${mapName}-map: (${variables.join(' ')});`
    : variables.join(' ');
};

module.exports = () =>
  [interpolateIntoSass(colors), interpolateIntoSass(colors, 'colors')].join(
    ' ',
  );
