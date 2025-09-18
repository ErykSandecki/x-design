import { useDispatch } from 'react-redux';

// store
import { setElementsCoordinates } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurEvent = {
  onBlurX: () => void;
  onBlurY: () => void;
};

export const useBlurEvent = (
  element: TElement,
  isMultiple: boolean,
  setX: (value: string) => void,
  setY: (value: string) => void,
  x: string,
  y: string,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlur = () => {
    const coordinates = { x: parseFloat(x), y: parseFloat(y) };

    if (isMultiple) {
      dispatch(setElementsCoordinates(coordinates, 'static'));
    } else {
      dispatch(setElementsCoordinates(coordinates, 'dynamic'));
    }
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
