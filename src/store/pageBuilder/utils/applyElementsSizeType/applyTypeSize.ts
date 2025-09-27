// types
import { TApplyElementsSizeTypeActionPaylad, TElementsData } from 'store/pageBuilder/types';
import { TElement, Unit } from 'types';

export const applyTypeSize = (
  clonedElements: TElementsData,
  id: TElement['id'],
  size: number,
  sizeType: TApplyElementsSizeTypeActionPaylad['sizeType'],
  type: TApplyElementsSizeTypeActionPaylad['type'],
): void => {
  switch (type) {
    case 'auto':
      clonedElements.allData[id][sizeType].unit = undefined;
      clonedElements.allData[id][sizeType].value = 'auto';
      clonedElements.dynamicData[id][sizeType].unit = undefined;
      clonedElements.dynamicData[id][sizeType].value = 'auto';
      break;
    case 'fixed':
      clonedElements.allData[id][sizeType].unit = undefined;
      clonedElements.allData[id][sizeType].value = size;
      clonedElements.dynamicData[id][sizeType].unit = undefined;
      clonedElements.dynamicData[id][sizeType].value = size;
      break;
    case 'max':
      const hasMax = clonedElements.allData[id][sizeType].max !== undefined;

      clonedElements.allData[id][sizeType].max = hasMax ? undefined : size;
      clonedElements.dynamicData[id][sizeType].max = hasMax ? undefined : size;
      break;
    case 'min':
      const hasMin = clonedElements.allData[id][sizeType].min !== undefined;

      clonedElements.allData[id][sizeType].min = hasMin ? undefined : size;
      clonedElements.dynamicData[id][sizeType].min = hasMin ? undefined : size;
      break;
    default:
      clonedElements.allData[id][sizeType].unit = Unit.percentage;
      clonedElements.allData[id][sizeType].value = size;
      clonedElements.dynamicData[id][sizeType].unit = Unit.percentage;
      clonedElements.dynamicData[id][sizeType].value = size;
  }
};
