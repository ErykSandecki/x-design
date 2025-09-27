import { isArray, zip } from 'lodash';

// others
import { DATA_TEST_PREFIX } from './constants';

// types
import { E2EAttribute } from 'types/e2e';
import { TE2EType, TE2EValue } from './types';

export const getDataTestAttribute = (type?: E2EAttribute | string): string => `${DATA_TEST_PREFIX}-${type}`;

export const getAttributes = (type: TE2EType | Array<TE2EType>, value: TE2EValue | Array<TE2EValue>): {} =>
  isArray(type) && isArray(value)
    ? zip(type, value).reduce(
        (obj, [type, value]) => ({
          ...obj,
          [getDataTestAttribute(type)]: value,
        }),
        {},
      )
    : { [getDataTestAttribute(type as TE2EType)]: value };
