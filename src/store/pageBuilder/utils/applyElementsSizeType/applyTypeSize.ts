// types
import { TApplyElementsSizeTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, Unit } from 'types';

export const applyTypeSize = (
  element: TElement,
  size: number,
  sizeType: TApplyElementsSizeTypeActionPayload['sizeType'],
  type: TApplyElementsSizeTypeActionPayload['type'],
): TElement['height'] | TElement['width'] => {
  switch (type) {
    case 'auto':
      return {
        ...element[sizeType],
        unit: undefined,
        value: 'auto',
      };
    case 'fixed':
      return {
        ...element[sizeType],
        unit: undefined,
        value: size,
      };
    case 'max':
      const hasMax = element[sizeType].max !== undefined;

      return {
        ...element[sizeType],
        max: hasMax ? undefined : size,
      };
    case 'min':
      const hasMin = element[sizeType].min !== undefined;

      return {
        ...element[sizeType],
        min: hasMin ? undefined : size,
      };
    default:
      return {
        ...element[sizeType],
        unit: Unit.percentage,
        value: size,
      };
  }
};
