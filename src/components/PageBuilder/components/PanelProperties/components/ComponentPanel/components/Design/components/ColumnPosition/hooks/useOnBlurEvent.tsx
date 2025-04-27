import { useDispatch } from 'react-redux';

// store
import {
  setElementCoordinates,
  setElementsCoordinates,
} from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseOnBlurEvent = {
  onBlurX: () => void;
  onBlurY: () => void;
};

export const useOnBlurEvent = (
  element: TElement,
  isMultiple: boolean,
  setX: (value: string) => void,
  setY: (value: string) => void,
  x: string,
  y: string,
): TUseOnBlurEvent => {
  const dispatch = useDispatch();
  const { id } = element;

  const handleBlur = () => {
    const coordinates = { x: parseFloat(x), y: parseFloat(y) };

    if (isMultiple) {
      dispatch(setElementsCoordinates(coordinates, 'static'));
    } else {
      dispatch(setElementCoordinates(coordinates, id));
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
