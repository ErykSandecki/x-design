// types
import { TElementsData, TSelectedElements } from 'store/pageBuilder/types';

export const hasSomeAlignment = (
  dynamicData: TElementsData['dynamicData'],
  selectedElements: TSelectedElements,
): boolean =>
  selectedElements.some(({ id }) => dynamicData[id].alignment !== undefined);
