import { useDispatch } from 'react-redux';

// store
import { rotateElement } from 'store/pageBuilder/actions';

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
      setAngle(element.rotate.toString());
    } else {
      dispatch(rotateElement(element.id, clampAngle(parseInt(angle))));
    }
  };

  return handleBlur;
};
