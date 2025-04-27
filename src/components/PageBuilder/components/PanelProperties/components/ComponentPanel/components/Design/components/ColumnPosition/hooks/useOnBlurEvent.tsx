import { useDispatch } from 'react-redux';

// store
import { setElementCoordinates } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseOnBlurEvent = {
  onBlurX: () => void;
  onBlurY: () => void;
};

export const useOnBlurEvent = (
  element: TElement,
  setX: (value: string) => void,
  setY: (value: string) => void,
  x: string,
  y: string,
): TUseOnBlurEvent => {
  const dispatch = useDispatch();
  const { id } = element;

  const handleBlurX = (): void => {
    if (x === '') {
      setX(element.coordinates.x.toString());
    } else {
      dispatch(
        setElementCoordinates({ x: parseFloat(x), y: parseFloat(y) }, id),
      );
    }
  };
  const handleBlurY = (): void => {
    if (y === '') {
      setY(element.coordinates.y.toString());
    } else {
      dispatch(
        setElementCoordinates({ x: parseFloat(x), y: parseFloat(y) }, id),
      );
    }
  };

  return {
    onBlurX: handleBlurX,
    onBlurY: handleBlurY,
  };
};
