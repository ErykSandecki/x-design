import { useDispatch, useSelector } from 'react-redux';

// hooks
import { useKeyboardHandler } from 'hooks';

// others
import { CONTROL } from 'constant/constants';

// store
import {
  canRedoReduxHistorySelector,
  canUndoReduxHistorySelector,
} from 'store/pageBuilder/selectors';
import {
  reducerHistoryRedo,
  reducerHistoryUndo,
  updateEventsStatus,
} from 'store/pageBuilder/actions';

// types
import { KeyboardKeys } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

type TUseKeyDown = void;

export const useKeyDown = (
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseKeyDown => {
  const canRedo = useSelector(canRedoReduxHistorySelector);
  const canUndo = useSelector(canUndoReduxHistorySelector);
  const dispatch = useDispatch();

  useKeyboardHandler(
    true,
    [canRedo, canUndo],
    [
      {
        action: () => dispatch(reducerHistoryRedo()),
        conditions: [canRedo],
        primaryKeys: [CONTROL, 'shift'],
        secondaryKey: KeyboardKeys.z,
      },
      {
        action: () => dispatch(reducerHistoryUndo()),
        conditions: [canUndo],
        primaryKeys: [CONTROL],
        secondaryKey: KeyboardKeys.z,
      },
      {
        action: () => setMouseMode(MouseMode.comment),
        secondaryKey: KeyboardKeys.e,
      },
      {
        action: () => {
          setMouseMode(MouseMode.default);
          dispatch(updateEventsStatus({ colorSampler: false }));
        },
        secondaryKey: KeyboardKeys.escape,
      },
      {
        action: () => setMouseMode(MouseMode.default),
        secondaryKey: KeyboardKeys.q,
      },
      {
        action: () => setMouseMode(MouseMode.move),
        secondaryKey: KeyboardKeys.w,
      },
      {
        action: () => setMouseMode(MouseMode.toolBeltA),
        secondaryKey: KeyboardKeys.f,
      },
    ],
    '',
    true,
  );
};
