// types
import { T2DCoordinates } from 'types';
import {
  TElementsData,
  TSelectedElement,
  TSelectedElements,
} from 'store/pageBuilder/types';

export const isMixed = (
  axis: keyof T2DCoordinates,
  dynamicData: TElementsData['dynamicData'],
  firstElement: TSelectedElement,
  selectedElements: TSelectedElements,
): boolean =>
  selectedElements.some(
    ({ id }) =>
      dynamicData[id].coordinates[axis] !==
      dynamicData[firstElement.id].coordinates[axis],
  );
