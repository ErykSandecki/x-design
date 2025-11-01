import { useDispatch } from 'react-redux';

// store
import { rotateElements } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { clampAngle } from 'utils/math/clampAngle';

export type TUseBlurEvent = TFunc;

export const useBlurEvent = (
  angle: string,
  currentAngle: TElement['angle'],
  setAngle: TFunc<[string]>,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlur = (): void => {
    if (angle === '' || isNaN(parseFloat(angle))) {
      setAngle(`${currentAngle.toString()}°`);
    } else {
      const targetAngle = clampAngle(parseInt(angle));

      setAngle(`${targetAngle}°`);
      dispatch(rotateElements(targetAngle));
    }
  };

  return handleBlur;
};
