// types
import { TAlignment } from 'types';
import { TElementsData, TSelectedElements } from 'store/pageBuilder/types';

export const hasSomeAlignment = (
  direction: keyof TAlignment,
  dynamicData: TElementsData['dynamicData'],
  selectedElements: TSelectedElements,
): boolean =>
  selectedElements.some(
    ({ id }) => dynamicData[id].alignment[direction] !== undefined,
  );
