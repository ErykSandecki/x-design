import { useDispatch } from 'react-redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

export type TUseMouseDownEvent = TFunc;

export const useMouseDownEvent = (): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (): void => {
    dispatch(updateEventsStatus({ isRotating: true }));
  };

  return handleMouseDown;
};
