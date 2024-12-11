import { every, isArray, isObject } from 'lodash';

export const isTypeGuard = <T>(
  object: unknown,
  keys: Array<keyof T>,
): object is T =>
  isObject(object) || isArray(object)
    ? every(
        keys.map((key) => Object.prototype.hasOwnProperty.call(object, key)),
      )
    : false;
