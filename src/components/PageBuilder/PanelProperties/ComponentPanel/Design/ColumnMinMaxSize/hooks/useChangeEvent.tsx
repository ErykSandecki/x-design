import { useDispatch } from 'react-redux';

// store
import { setElementsSizesMinMax } from 'store/pageBuilder/actions';

// types
import { TSetElementsSizesActionPayload } from 'store/pageBuilder/types';
import { TValueScore } from 'types';

export type TUseChangeEvent = {
  onChangeHeight: TFunc<[string, boolean?]>;
  onChangeWidth: TFunc<[string, boolean?]>;
};

export const useChangeEvent = (
  score: keyof TValueScore,
  setHeightScore: TFunc<[string]>,
  setWidthScore: TFunc<[string]>,
): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (
    value: string,
    isScrubbableInput: boolean,
    sizeType: TSetElementsSizesActionPayload['sizeType'],
  ): void => {
    if (isScrubbableInput) {
      dispatch(setElementsSizesMinMax(score, sizeType, parseFloat(value)));
    }
  };

  const handleChangeHeightScore = (value: string, isScrubbableInput: boolean): void => {
    setHeightScore(value);
    updateStore(value, isScrubbableInput, 'height');
  };

  const handleChangeWidthScore = (value: string, isScrubbableInput: boolean): void => {
    setWidthScore(value);
    updateStore(value, isScrubbableInput, 'width');
  };

  return {
    onChangeHeight: handleChangeHeightScore,
    onChangeWidth: handleChangeWidthScore,
  };
};
