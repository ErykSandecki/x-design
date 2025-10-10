import { useDispatch } from 'react-redux';

// store
import { setElementsSizesMinMax } from 'store/pageBuilder/actions';

// types
import { TElement, TScore } from 'types';

export type TUseBlurEvent = {
  onBlurHeight: TFunc;
  onBlurWidth: TFunc;
};

export const useBlurEvent = (
  element: TElement,
  height: string,
  score: keyof TScore,
  setHeightScore: TFunc<[string]>,
  setWidthScore: TFunc<[string]>,
  width: string,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlurHeightScore = (): void => {
    if (height === '') {
      setHeightScore(element.height.value.toString());
    } else {
      const targetHeight = parseFloat(height);
      dispatch(setElementsSizesMinMax(score, 'height', targetHeight));
    }
  };

  const handleBlurWidthScore = (): void => {
    if (width === '') {
      setWidthScore(element.width.value.toString());
    } else {
      const targetWidth = parseFloat(width);
      dispatch(setElementsSizesMinMax(score, 'width', targetWidth));
    }
  };

  return {
    onBlurHeight: handleBlurHeightScore,
    onBlurWidth: handleBlurWidthScore,
  };
};
