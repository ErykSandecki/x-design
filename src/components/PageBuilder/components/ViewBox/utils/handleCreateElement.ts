import { Dispatch } from 'redux';

// store
import { addElement } from 'store/pageBuilder/actions';

// types
import { ElementType, LayoutType } from 'types';
import { MouseMode } from '../../../../../types/enums/mouseMode';
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
    const layout = { type: LayoutType.default };

    const element: TAddELementActionPayload = {
      alignment: {},
      angle: 0,
      background: {
        properties: { alpha: '100', color: '#ffffff', format: 'hex' },
        visible: true,
      },
      children: [],
      coordinates: { x, y },
      deepLevel: 0,
      height: {
        value: Math.abs(y1 - y2),
      },
      id: generateID(),
      layout,
      parentId: '-1',
      position: 'absolute',
      type: ElementType.frame,
      width: {
        value: Math.abs(x1 - x2),
      },
    };

    dispatch(addElement(element));
    setElementArea(null);
    setMouseMode(MouseMode.default);
  }
};
