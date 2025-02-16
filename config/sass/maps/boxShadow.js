const { kebabCase, camelCase, mapKeys, mapValues } = require('lodash');
const boxShadows = require('../variables/boxShadows');
const constants = require('../../constants/constants');

module.exports = (forScss) =>
  mapValues(
    mapKeys(boxShadows, (_, key) => camelCase(key)),
    (value, key) =>
      forScss ? `${constants.prefix}${kebabCase(key)}` : `${value.$value}`,
  );
