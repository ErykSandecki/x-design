import { useDispatch } from 'react-redux';

// store
import { setElementsSizes } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurEvent = {
  onBlurHeight: TFunc;
  onBlurWidth: TFunc;
};

export const useBlurEvent = (
  elementHeight: TElement['height'],
  elementWidth: TElement['width'],
  height: string,
  setHeight: TFunc<[string]>,
  setWidth: TFunc<[string]>,
  width: string,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlurHeight = (): void => {
    if (height === '') {
      setHeight(elementHeight.value.toString());
    } else {
      dispatch(setElementsSizes('height', parseFloat(height)));
    }
  };

  const handleBlurWidth = (): void => {
    if (width === '') {
      setWidth(elementWidth.value.toString());
    } else {
      dispatch(setElementsSizes('width', parseFloat(width)));
    }
  };

  return {
    onBlurHeight: handleBlurHeight,
    onBlurWidth: handleBlurWidth,
  };
};
