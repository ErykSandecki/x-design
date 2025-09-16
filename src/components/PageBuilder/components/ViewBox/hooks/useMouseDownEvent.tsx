import { MouseEvent, RefObject } from 'react';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// types
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { T3DCoordinates, TObject, TRectCoordinates } from 'types';
import { TRectArea, TRectAreaExtended } from '../../../../PageBuilder/types';

// utils
import { calculateAbsolutePositions } from '../utils/calculateAbsolutePositions';
import { handleInitElementArea } from '../utils/handleInitElementArea';
import { handleInitSelectableArea } from '../utils/handleInitSelectableArea';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  setElementArea: (elementArea: TRectArea) => void,
  setSelectableArea: (selectableArea: TRectAreaExtended) => void,
): TUseMouseDownEvent => {
  const { itemsRefs } = useRefs();

  const handleMouseDown = (event: MouseEvent): void => {
    calculateAbsolutePositions(event, mouseMode, rectCoordinates, itemsRefs);
    handleInitElementArea(coordinates, event, mouseMode, setElementArea);
    handleInitSelectableArea(coordinates, event, mouseMode, setSelectableArea);
  };

  return handleMouseDown;
};
