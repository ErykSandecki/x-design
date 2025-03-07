import { Dispatch } from 'redux';

// store
import { addElement } from 'store/pageBuilder/actions';

// types
import { ElementType, TRectCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TAddELementActionPayload } from 'store/pageBuilder/types';

// utils
import { generateID } from 'utils';

export const handleCreateElement = (
  dispatch: Dispatch,
  elementArea: TRectCoordinates,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TRectCoordinates) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
): void => {
  if (elementArea && mouseMode === MouseMode.toolBeltA) {
    const { x1, x2, y1, y2 } = elementArea;
    const x = x1 < x2 ? x1 : x2;
    const y = y1 < y2 ? y1 : y2;
    const element: TAddELementActionPayload = {
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
    setElementArea(null);
    setMouseMode(MouseMode.default);
  }
};
