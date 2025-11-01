import { useDispatch } from 'react-redux';

// hooks
import { useKeyboardHandler } from 'hooks';

// others
import { KEYBOARD_SHORTCUTS } from '../keys';

// store
import { canRedoReduxHistorySelector, canUndoReduxHistorySelector } from 'store/pageBuilder/selectors';
import { reducerHistoryRedo, reducerHistoryUndo } from 'store/pageBuilder/actions';

// types
import { MouseMode } from 'types';

// utils
import { onEscapeChangeMouseModeHandler } from '../utils/onEscapeChangeMouseModeHandler';

type TUseKeyDown = void;

export const useKeyDown = (setMouseMode: TFunc<[MouseMode]>): TUseKeyDown => {
  const dispatch = useDispatch();

  useKeyboardHandler(
    true,
    [],
    [
      {
        action: (): any => dispatch(reducerHistoryRedo()),
        conditions: [canRedoReduxHistorySelector(window.store.getState())],
        primaryKeys: KEYBOARD_SHORTCUTS.historyRedo[0].primaryKeys,
        secondaryKey: KEYBOARD_SHORTCUTS.historyRedo[0].secondaryKey,
      },
      {
        action: (): any => dispatch(reducerHistoryUndo()),
        conditions: [canUndoReduxHistorySelector(window.store.getState())],
        primaryKeys: KEYBOARD_SHORTCUTS.historyUndo[0].primaryKeys,
        secondaryKey: KEYBOARD_SHORTCUTS.historyUndo[0].secondaryKey,
      },
      {
        action: (): any => setMouseMode(MouseMode.comment),
        secondaryKey: KEYBOARD_SHORTCUTS.mouseModeComment[0].secondaryKey,
      },
      {
        action: (): any => onEscapeChangeMouseModeHandler(dispatch, setMouseMode),
        secondaryKey: KEYBOARD_SHORTCUTS.mouseModeDefault[0].secondaryKey,
      },
      {
        action: (): any => setMouseMode(MouseMode.default),
        secondaryKey: KEYBOARD_SHORTCUTS.mouseModeDefault[1].secondaryKey,
      },
      {
        action: (): any => setMouseMode(MouseMode.move),
        secondaryKey: KEYBOARD_SHORTCUTS.mouseModeMove[0].secondaryKey,
      },
      {
        action: (): any => setMouseMode(MouseMode.toolBeltA),
        secondaryKey: KEYBOARD_SHORTCUTS.mouseModeToolBeltA[0].secondaryKey,
      },
    ],
    '',
    true,
  );
};
