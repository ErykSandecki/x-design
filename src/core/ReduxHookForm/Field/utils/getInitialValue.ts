import { head, isArray } from 'lodash';

// types
import { TFieldValue } from '../../types';

export const getComplexInitalValue = <V>(initValue: Array<boolean | string>, shouldBeEmpty: boolean): V => {
  const length = initValue.length;
  const isBoolean = typeof head(initValue) === 'boolean';
  const values = Array.from(Array(length), () => (isBoolean ? false : ''));

  return shouldBeEmpty ? (values as V) : (initValue as V);
};

export const getInitialValue = <V extends TFieldValue>(
  defaultValue: V,
  formatOnInit: (value: V) => V,
  shouldBeEmpty: boolean,
): V => {
  const initValue = formatOnInit ? formatOnInit((defaultValue as V) || ('' as V)) : (defaultValue as V);

  switch (true) {
    case typeof initValue === 'boolean':
      return shouldBeEmpty ? (false as V) : initValue;
    case typeof initValue === 'number':
      return shouldBeEmpty ? (0 as V) : initValue;
    case typeof initValue === 'string':
      return shouldBeEmpty ? ('' as V) : initValue;
    case isArray(initValue) && !!initValue.length:
      return getComplexInitalValue<V>(initValue, shouldBeEmpty);
    default:
      return null;
  }
};
