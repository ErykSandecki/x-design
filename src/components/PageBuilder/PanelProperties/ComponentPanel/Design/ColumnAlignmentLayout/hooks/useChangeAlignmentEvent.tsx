import { useDispatch } from 'react-redux';

// store
import { changeLayoutAlignment } from 'store/pageBuilder/actions';

// types
import { AlignmentLayout } from 'types';

export type TUseChangeAlignmentLayoutEvent = TFunc<[AlignmentLayout?]>;

export const useChangeAlignmentLayoutEvent = (
  setAlignment: TFunc<[AlignmentLayout]>,
): TUseChangeAlignmentLayoutEvent => {
  const dispatch = useDispatch();

  const handleChange = (alignment: AlignmentLayout): void => {
    setAlignment(alignment);
    dispatch(changeLayoutAlignment(alignment));
  };

  return handleChange;
};
