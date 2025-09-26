import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    dispatch(
      updateEventsStatus({
        isResizing: false,
        isRotating: false,
        selectedAnchorResize: AnchorResize.none,
        selectedAnchorRotate: AnchorRotate.none,
      }),
    );
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return (): void => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
};
