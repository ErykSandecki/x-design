// types
import { TAlignment } from 'types';
import { TElements, TSelectedElements } from 'store/pageBuilder/types';

export const hasSomeAlignment = (
  direction: keyof TAlignment,
  elements: TElements,
  selectedElements: TSelectedElements,
): boolean => selectedElements.some(({ id }) => elements[id].alignment[direction] !== undefined);
