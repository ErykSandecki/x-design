import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurEvent = {
  onBlurOpacity: TFunc;
};

export const useBlurEvent = (
  currentOpacity: TElement['opacity'],
  opacity: string,
  setOpacity: TFunc<[string]>,
): TUseBlurEvent => {
  const dispatch = useDispatch();

  const handleBlurOpacity = (): void => {
    if (opacity === '') {
      setOpacity(currentOpacity.value.toString());
    } else {
      dispatch(changeProperties({ opacity: { ...currentOpacity, value: parseInt(opacity) } }));
    }
  };

  return {
    onBlurOpacity: handleBlurOpacity,
  };
};
