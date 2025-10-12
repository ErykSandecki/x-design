import { MouseEvent, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TObject } from 'types';
import { TRectAreaExtended } from '../../types';

// utils
import { calculateAbsolutePositions } from '../utils/calculateAbsolutePositions';
import { handleInitElementArea } from '../utils/handleInitElementArea';
import { handleInitSelectableArea } from '../utils/handleInitSelectableArea';

export type TUseMouseDownEvent = TFunc<[MouseEvent]>;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  setSelectableArea: TFunc<[TRectAreaExtended]>,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();
  const hoverOnElement = useSelector(eventSelectorCreator('hoverOnElement'));
  const { itemsRefs, zoomContentRef } = useRefs();

  const handleMouseDown = (event: MouseEvent): void => {
    calculateAbsolutePositions(event, mouseMode, rectCoordinates, itemsRefs, zoomContentRef);
    handleInitElementArea(coordinates, dispatch, event, hoverOnElement, mouseMode);
    handleInitSelectableArea(coordinates, event, mouseMode, setSelectableArea);
  };

  return handleMouseDown;
};
