import { Dispatch } from 'redux';

// store
import { addElement } from 'store/pageBuilder/actions';
import { elementsSelector, eventSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { ElementType, LayoutType } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TAddELementActionPayload } from 'store/pageBuilder/types';

// utils
import { generateJestID } from 'utils';

export const handleCreateElement = (
  dispatch: Dispatch,
  mouseMode: MouseMode,
  setMouseMode: TFunc<[MouseMode]>,
): void => {
  const possibleElement = eventSelectorCreator('possibleElement')(store.getState());

  if (possibleElement && mouseMode === MouseMode.toolBeltA) {
    const { x1, x2, y1, y2 } = possibleElement;
    const layout = { type: LayoutType.freeForm };
    const x = x1 < x2 ? x1 : x2;
    const y = y1 < y2 ? y1 : y2;

    const element: TAddELementActionPayload = {
      alignment: {},
      angle: 0,
      aspectRatio: false,
      background: {
        properties: { alpha: '100', color: '#ffffff', format: 'hex' },
        visible: true,
      },
      children: [],
      coordinates: { x, y },
      deepLevel: 0,
      flip: { x: false, y: false },
      height: {
        value: Math.abs(y1 - y2),
      },
      id: generateJestID(elementsSelector(store.getState())),
      layout,
      parentId: possibleElement.parentId,
      position: 'absolute',
      type: ElementType.frame,
      width: {
        value: Math.abs(x1 - x2),
      },
    };

    dispatch(addElement(element));
    setMouseMode(MouseMode.default);
  }
};
