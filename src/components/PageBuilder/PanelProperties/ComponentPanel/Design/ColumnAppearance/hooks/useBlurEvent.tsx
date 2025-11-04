import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { normalizeMultipleValue } from 'components/PageBuilder/utils/normalizeMultipleValue';

export type TUseBlurEvent = {
  onBlurBorderRadius: TFunc;
  onBlurOpacity: TFunc;
};

export const useBlurEvent = (
  borderRadius: string,
  currentBorderRadius: TElement['borderRadius'],
  currentOpacity: TElement['opacity'],
  isMixedBorderRadius: boolean,
  opacity: string,
  setBorderRadius: TFunc<[string]>,
  setOpacity: TFunc<[string]>,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlurBorderRadius = (): void => {
    if (borderRadius === '') {
      setBorderRadius(normalizeMultipleValue(isMixedBorderRadius, currentBorderRadius.b.value));
    } else {
      const targetValue = parseFloat(borderRadius);

      dispatch(
        changeProperties({
          borderRadius: {
            b: { mode: 'fixed', value: targetValue },
            l: { mode: 'fixed', value: targetValue },
            r: { mode: 'fixed', value: targetValue },
            t: { mode: 'fixed', value: targetValue },
          },
        }),
      );
    }
  };

  const handleBlurOpacity = (): void => {
    if (opacity === '') {
      setOpacity(currentOpacity.value.toString());
    } else {
      dispatch(changeProperties({ opacity: { ...currentOpacity, value: parseInt(opacity) } }));
    }
  };

  return {
    onBlurBorderRadius: handleBlurBorderRadius,
    onBlurOpacity: handleBlurOpacity,
  };
};
