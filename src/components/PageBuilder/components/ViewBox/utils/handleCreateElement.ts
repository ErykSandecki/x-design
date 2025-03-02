import { Dispatch } from 'redux';

// store
import { addElement } from 'store/pageBuilder/actions';

// types
import { ElementType, TElement, TRectCoordinates } from 'types';
import { MouseMode } from '../../../enums';

// utils
import { generateID } from 'utils';

export const handleCreateElement = (
  dispatch: Dispatch,
  frameArea: TRectCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
): void => {
  if (frameArea && mouseMode === MouseMode.toolBeltA) {
    const { x1, x2, y1, y2 } = frameArea;
    const x = x1 < x2 ? x1 : x2;
    const y = y1 < y2 ? y1 : y2;
    const element: TElement = {
      height: Math.abs(y1 - y2),
      id: generateID(),
      parentId: '-1',
      positionAbsolute: { x, y },
      positionRelative: { x, y },
      rotate: 0,
      type: ElementType.frame,
      width: Math.abs(x1 - x2),
    };

    dispatch(addElement(element));
    setFrameArea(null);
    setMouseMode(MouseMode.default);
  }
};
