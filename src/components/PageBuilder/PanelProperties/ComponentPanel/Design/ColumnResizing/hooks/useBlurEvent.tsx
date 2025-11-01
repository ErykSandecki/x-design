import { useDispatch } from 'react-redux';

// store
import { setElementsSizes } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { isPureNumber } from 'utils';

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
      const targetHeight = isPureNumber(height) ? parseFloat(height) : height;
      dispatch(setElementsSizes('height', targetHeight));
    }
  };

  const handleBlurWidth = (): void => {
    if (width === '') {
      setWidth(elementWidth.value.toString());
    } else {
      const targetWidth = isPureNumber(width) ? parseFloat(width) : width;
      dispatch(setElementsSizes('width', targetWidth));
    }
  };

  return {
    onBlurHeight: handleBlurHeight,
    onBlurWidth: handleBlurWidth,
  };
};
