import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// store
import { changeParent } from 'store/pageBuilder/actions';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (isPressing: boolean, setIsPressing: TFunc<[boolean]>): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    setIsPressing(false);
    dispatch(changeParent());
  };

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return (): void => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPressing]);
};
