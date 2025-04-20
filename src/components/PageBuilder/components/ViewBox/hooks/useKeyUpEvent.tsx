import { useDispatch } from 'react-redux';

// hooks
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { KeyboardKeys } from 'types';

export type TUseKeyUpEvent = () => void;

export const useKeyUpEvent = (): TUseKeyUpEvent => {
  const dispatch = useDispatch();

  const handleKeyDown = (): void => {
    dispatch(updateEventsStatus({ pressedKey: KeyboardKeys.none }));
  };

  return handleKeyDown;
};
