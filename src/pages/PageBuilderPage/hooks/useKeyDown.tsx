import { useDispatch, useSelector } from 'react-redux';

// hooks
import { useKeyboardHandler } from 'hooks';

// others
import { CONTROL } from 'constant/constants';

// store
import { canRedoReduxHistorySelector, canUndoReduxHistorySelector, pageSelector } from 'store/pageBuilder/selectors';
import { reducerHistoryRedo, reducerHistoryUndo, updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { KeyboardKeys, MouseMode } from 'types';

type TUseKeyDown = void;

export const useKeyDown = (setMouseMode: TFunc<[MouseMode]>): TUseKeyDown => {
  const dispatch = useDispatch();
  const canRedo = useSelector(canRedoReduxHistorySelector);
  const canUndo = useSelector(canUndoReduxHistorySelector);
  const page = useSelector(pageSelector);

  useKeyboardHandler(
    true,
    [page],
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
