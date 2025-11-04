import { get } from 'lodash';

// types
import { TApplyElementsTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, TNestedKeyOf, TValueExtended, Unit } from 'types';

export const applyMode = (
  element: TElement,
  mode: TApplyElementsTypeActionPayload['mode'],
  property: TNestedKeyOf<TElement>,
  unit: Unit,
): TValueExtended => {
  const restData = get(element, property) as TValueExtended;

  switch (mode) {
    case 'auto':
    case 'fixed':
      return {
        ...restData,
        mode,
        unit: undefined,
      };
    case 'unit':
      return {
        ...restData,
        mode,
        unit,
      };
    default:
      return {
        ...restData,
        mode,
        unit: undefined,
      };
  }
};
