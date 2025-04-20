import { KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';

// hooks
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { KeyboardKeys } from 'types';

export type TUseKeyDownEvent = (event: KeyboardEvent) => void;

export const useKeyDownEvent = (): TUseKeyDownEvent => {
  const dispatch = useDispatch();

  const handleKeyDown = (event: KeyboardEvent): void => {
    dispatch(updateEventsStatus({ pressedKey: event.key as KeyboardKeys }));
  };

  return handleKeyDown;
};
