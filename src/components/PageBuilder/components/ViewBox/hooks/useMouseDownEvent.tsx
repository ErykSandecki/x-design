import { MouseEvent, RefObject } from 'react';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// types
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TObject } from 'types';
import { TRectArea, TRectAreaExtended } from '../../../../PageBuilder/types';

// utils
import { calculateAbsolutePositions } from '../utils/calculateAbsolutePositions';
import { handleInitElementArea } from '../utils/handleInitElementArea';
import { handleInitSelectableArea } from '../utils/handleInitSelectableArea';

export type TUseMouseDownEvent = TFunc<[MouseEvent]>;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  setElementArea: TFunc<[TRectArea]>,
  setSelectableArea: TFunc<[TRectAreaExtended]>,
): TUseMouseDownEvent => {
  const { itemsRefs, zoomContentRef } = useRefs();

  const handleMouseDown = (event: MouseEvent): void => {
    calculateAbsolutePositions(event, mouseMode, rectCoordinates, itemsRefs, zoomContentRef);
    handleInitElementArea(coordinates, event, mouseMode, setElementArea);
    handleInitSelectableArea(coordinates, event, mouseMode, setSelectableArea);
  };

  return handleMouseDown;
};
