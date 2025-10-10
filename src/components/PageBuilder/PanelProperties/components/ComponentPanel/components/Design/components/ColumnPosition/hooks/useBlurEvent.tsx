import { useDispatch } from 'react-redux';

// store
import { setElementsCoordinates } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurEvent = {
  onBlurX: TFunc;
  onBlurY: TFunc;
};

export const useBlurEvent = (
  element: TElement,
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
      setX(element.coordinates.x.toString());
    } else {
      handleBlur();
    }
  };

  const handleBlurY = (): void => {
    if (y === '') {
      setY(element.coordinates.y.toString());
    } else {
      handleBlur();
    }
  };

  return {
    onBlurX: handleBlurX,
    onBlurY: handleBlurY,
  };
};
