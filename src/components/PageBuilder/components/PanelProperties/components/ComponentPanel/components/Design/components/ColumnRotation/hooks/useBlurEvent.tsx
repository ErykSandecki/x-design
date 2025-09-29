import { useDispatch } from 'react-redux';

// store
import { rotateElements } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { clampAngle } from 'utils/math/clampAngle';

export type TUseBlurEvent = TFunc;

export const useBlurEvent = (angle: string, element: TElement, setAngle: TFunc<[string]>): TUseBlurEvent => {
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
