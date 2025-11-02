import { Dispatch } from 'redux';

// store
import { addElement } from 'store/pageBuilder/actions';
import { elementsSelector, eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { AlignmentLayout, ElementType, LayoutType } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TAddELementActionPayload } from 'store/pageBuilder/types';

// utils
import { generateJestID } from 'utils';

export const handleCreateElement = (
  dispatch: Dispatch,
  mouseMode: MouseMode,
  setMouseMode: TFunc<[MouseMode]>,
): void => {
  const possibleElement = eventSelectorCreator('possibleElement')(window.store.getState());

  if (possibleElement && mouseMode === MouseMode.toolBeltA) {
    const { x1, x2, y1, y2 } = possibleElement;
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
      clipContent: true,
      coordinates: { x, y },
      deepLevel: 0,
      flip: { x: false, y: false },
      height: {
        type: 'fixed',
        value: Math.abs(y1 - y2),
      },
      id: generateJestID(elementsSelector(window.store.getState())),
      layout: {
        alignment: AlignmentLayout.none,
        boxSizing: 'excluded',
        gap: { column: { value: 0 }, row: { value: 0 } },
        grid: { columns: 1, rows: 1 },
        type: LayoutType.freeForm,
      },
      margin: { b: { value: 0 }, l: { value: 0 }, r: { value: 0 }, t: { value: 0 } },
      mixBlendMode: 'initial',
      padding: { b: { value: 0 }, l: { value: 0 }, r: { value: 0 }, t: { value: 0 } },
      parentId: possibleElement.parentId,
      position: 'absolute',
      type: ElementType.frame,
      visible: true,
      width: {
        type: 'fixed',
        value: Math.abs(x1 - x2),
      },
    };

    dispatch(addElement(element));
    setMouseMode(MouseMode.default);
  }
};
