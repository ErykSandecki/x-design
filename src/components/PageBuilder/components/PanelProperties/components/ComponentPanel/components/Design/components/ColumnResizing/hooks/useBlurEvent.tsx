import { useDispatch } from 'react-redux';

// store
import { setElementsSizes } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurEvent = {
  onBlurHeight: () => void;
  onBlurWidth: () => void;
};

export const useBlurEvent = (
  element: TElement,
  height: string,
  setHeight: (height: string) => void,
  setWidth: (width: string) => void,
  width: string,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlurHeight = (): void => {
    if (height === '') {
      setHeight(element.height.toString());
    } else {
      dispatch(setElementsSizes('height', parseFloat(height)));
    }
  };

  const handleBlurWidth = (): void => {
    if (width === '') {
      setWidth(element.width.toString());
    } else {
      dispatch(setElementsSizes('width', parseFloat(width)));
    }
  };

  return {
    onBlurHeight: handleBlurHeight,
    onBlurWidth: handleBlurWidth,
  };
};
