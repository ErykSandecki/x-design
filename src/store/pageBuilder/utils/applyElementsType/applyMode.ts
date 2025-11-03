import { get } from 'lodash';

// types
import { TApplyElementsTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, TNestedKeyOf, TValueExtended } from 'types';

export const applyMode = (
  element: TElement,
  mode: TApplyElementsTypeActionPayload['mode'],
  property: TNestedKeyOf<TElement>,
): TValueExtended => {
  const restData = get(element, property) as TValueExtended;

  switch (mode) {
    case 'fixed':
      return {
        ...restData,
        mode,
      };
    default:
      return {
        ...restData,
        mode,
      };
  }
};
