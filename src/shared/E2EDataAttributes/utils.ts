import { isArray, zip } from 'lodash';

// others
import { DATA_TEST_PREFIX } from './constants';

// types
import { E2EAttribute } from 'types/e2e';
import { E2EType, E2EValue } from './types';

export const getDataTestAttribute = (type?: E2EAttribute | string): string =>
  `${DATA_TEST_PREFIX}-${type}`;

export const getAttributes = (
  type: E2EType | Array<E2EType>,
  value: E2EValue | Array<E2EValue>,
) =>
  isArray(type) && isArray(value)
    ? zip(type, value).reduce(
        (obj, [type, value]) => ({
          ...obj,
          [getDataTestAttribute(type)]: value,
        }),
        {},
      )
    : { [getDataTestAttribute(type as E2EType)]: value };
