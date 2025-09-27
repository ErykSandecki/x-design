import { useDispatch } from 'react-redux';

// store
import { setElementsSizes } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';
import { TFocusElement } from '../types';

// utils
import { isPureNumber } from 'utils';

export type TUseBlurEvent = {
  onBlurHeight: () => void;
  onBlurWidth: () => void;
};

export const useBlurEvent = (
  element: TElement,
  height: string,
  setHeight: (height: string) => void,
  setIsFocused: TFunc<[TFocusElement]>,
  setWidth: (width: string) => void,
  width: string,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlurHeight = (): void => {
    setIsFocused('');

    if (height === '') {
      setHeight(element.height.value.toString());
    } else {
      const targetHeight = isPureNumber(height) ? parseFloat(height) : height;
      dispatch(setElementsSizes('height', targetHeight));
    }
  };

  const handleBlurWidth = (): void => {
    setIsFocused('');

    if (width === '') {
      setWidth(element.width.value.toString());
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
