import { HTMLAttributes } from 'react';
import { isBoolean, isNil, transform } from 'lodash';

export const mapAttributes = <T extends HTMLElement = HTMLElement>(attrs: Record<string, any>): HTMLAttributes<T> =>
  transform(
    attrs,
    (result, value, key) => {
      if (isNil(value)) {
        return;
      }

      if (isBoolean(value)) {
        if (value) {
          result[key] = '';
        }

        return;
      }

      if (typeof value === 'string' && value.trim() === '') {
        return;
      }

      result[key] = String(value);
    },
    {} as HTMLAttributes<T>,
  );
