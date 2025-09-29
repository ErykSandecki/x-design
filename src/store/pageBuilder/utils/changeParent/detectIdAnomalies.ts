import { TEvents, TSelectedElements } from 'store/pageBuilder/types';

export const detectIdAnomalies = (
  draggableElements: TEvents['draggableElements'],
  selectedElements: TSelectedElements,
): boolean =>
  selectedElements.some(({ id }) => !draggableElements.some((draggableElement) => draggableElement.id === id));
