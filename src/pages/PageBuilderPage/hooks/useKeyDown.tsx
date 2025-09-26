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
        action: (): any => dispatch(reducerHistoryRedo()),
        conditions: [canRedo],
        primaryKeys: [CONTROL, 'shift'],
        secondaryKey: KeyboardKeys.z,
      },
      {
        action: (): any => dispatch(reducerHistoryUndo()),
        conditions: [canUndo],
        primaryKeys: [CONTROL],
        secondaryKey: KeyboardKeys.z,
      },
      {
        action: (): any => setMouseMode(MouseMode.comment),
        secondaryKey: KeyboardKeys.e,
      },
      {
        action: (): any => {
          setMouseMode(MouseMode.default);
          dispatch(updateEventsStatus({ colorSampler: false }));
        },
        secondaryKey: KeyboardKeys.escape,
      },
      {
        action: (): any => setMouseMode(MouseMode.default),
        secondaryKey: KeyboardKeys.q,
      },
      {
        action: (): any => setMouseMode(MouseMode.move),
        secondaryKey: KeyboardKeys.w,
      },
      {
        action: (): any => setMouseMode(MouseMode.toolBeltA),
        secondaryKey: KeyboardKeys.f,
      },
    ],
    '',
    true,
  );
};
