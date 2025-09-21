import { useDispatch } from 'react-redux';

// store
import { rotateElements } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { clampAngle } from 'utils/math/clampAngle';

export type TUseBlurEvent = () => void;

export const useBlurEvent = (
  angle: string,
  element: TElement,
  setAngle: (angle: string) => void,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlur = (): void => {
    if (angle === '') {
      setAngle(element.angle.toString());
    } else {
      dispatch(rotateElements(clampAngle(parseInt(angle))));
    }
  };

  return handleBlur;
};
