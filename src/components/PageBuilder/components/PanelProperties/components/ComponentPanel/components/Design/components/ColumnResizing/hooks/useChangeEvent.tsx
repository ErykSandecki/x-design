import { useDispatch } from 'react-redux';

// store
import { setElementsSizes } from 'store/pageBuilder/actions';

// types
import { TSetElementsSizesActionPayload } from 'store/pageBuilder/types';

export type TUseChangeEvent = {
  onChangeHeight: TFunc<[string, boolean?]>;
  onChangeWidth: TFunc<[string, boolean?]>;
};

export const useChangeEvent = (setHeight: TFunc<[string]>, setWidth: TFunc<[string]>): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (
    value: string,
    isScrubbableInput: boolean,
    sizeType: TSetElementsSizesActionPayload['sizeType'],
  ): void => {
    if (isScrubbableInput) {
      dispatch(setElementsSizes(sizeType, parseFloat(value)));
    }
  };

  const handleChangeHeight = (value: string, isScrubbableInput: boolean): void => {
    setHeight(value);
    updateStore(value, isScrubbableInput, 'height');
  };

  const handleChangeWidth = (value: string, isScrubbableInput: boolean): void => {
    setWidth(value);
    updateStore(value, isScrubbableInput, 'width');
  };

  return {
    onChangeHeight: handleChangeHeight,
    onChangeWidth: handleChangeWidth,
  };
};
