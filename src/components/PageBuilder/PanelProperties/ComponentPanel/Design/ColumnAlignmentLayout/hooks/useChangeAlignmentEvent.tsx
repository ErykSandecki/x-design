import { useDispatch } from 'react-redux';

// store
import { changeLayoutAlignment } from 'store/pageBuilder/actions';

// types
import { AlignmentLayout } from 'types';

export type TUseChangeAlignmentEvent = TFunc<[AlignmentLayout?]>;

export const useChangeAlignmentEvent = (setAlignment: TFunc<[AlignmentLayout]>): TUseChangeAlignmentEvent => {
  const dispatch = useDispatch();

  const handleChange = (alignment: AlignmentLayout): void => {
    setAlignment(alignment);
    dispatch(changeLayoutAlignment(alignment));
  };

  return handleChange;
};
