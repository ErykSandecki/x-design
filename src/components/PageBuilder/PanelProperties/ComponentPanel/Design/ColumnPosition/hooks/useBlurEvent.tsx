import { useDispatch } from 'react-redux';

// store
import { setElementsCoordinates } from 'store/pageBuilder/actions';

export type TUseBlurEvent = {
  onBlurX: TFunc;
  onBlurY: TFunc;
};

export const useBlurEvent = (
  currentX: T2DCoordinates['x'],
  currentY: T2DCoordinates['y'],
  setX: TFunc<[string]>,
  setY: TFunc<[string]>,
  x: string,
  y: string,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlur = (): void => {
    const coordinates = { x: parseFloat(x), y: parseFloat(y) };
    dispatch(setElementsCoordinates(coordinates, 'static'));
  };

  const handleBlurX = (): void => {
    if (x === '') {
      setX(currentX.toString());
    } else {
      handleBlur();
    }
  };

  const handleBlurY = (): void => {
    if (y === '') {
      setY(currentY.toString());
    } else {
      handleBlur();
    }
  };

  return {
    onBlurX: handleBlurX,
    onBlurY: handleBlurY,
  };
};
