import { useDispatch } from 'react-redux';

// store
import { changeLayoutAlignment } from 'store/pageBuilder/actions';

// types
import { AlignmentFlow } from 'types';

export type TUseChangeAlignmentEvent = TFunc<[AlignmentFlow?]>;

export const useChangeAlignmentEvent = (setAlignment: TFunc<[AlignmentFlow]>): TUseChangeAlignmentEvent => {
  const dispatch = useDispatch();

  const handleChange = (alignment: AlignmentFlow): void => {
    setAlignment(alignment);
    dispatch(changeLayoutAlignment(alignment));
  };

  return handleChange;
};
