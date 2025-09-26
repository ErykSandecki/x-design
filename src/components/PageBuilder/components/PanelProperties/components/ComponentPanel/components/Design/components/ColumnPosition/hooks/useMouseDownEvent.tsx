import { useDispatch } from 'react-redux';

// store
import { clearPrevState, updateEventsStatus } from 'store/pageBuilder/actions';

export type TUseMouseDownEvent = () => void;

export const useMouseDownEvent = (): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (): void => {
    dispatch(clearPrevState());
    dispatch(updateEventsStatus({ isMultipleMoving: true }));
  };

  return handleMouseDown;
};
