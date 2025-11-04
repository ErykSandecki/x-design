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
  const hasMax = restData.max !== undefined;
  const hasMin = restData.min !== undefined;

  switch (mode) {
    case 'auto':
    case 'fixed':
      return {
        ...restData,
        mode,
        unit: undefined,
      };
    case 'max':
      return {
        ...restData,
        max: hasMax ? undefined : { mode: 'fixed', value: 0 },
      };
    case 'min':
      return {
        ...restData,
        min: hasMin ? undefined : { mode: 'fixed', value: 0 },
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
