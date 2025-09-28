import { useDispatch } from 'react-redux';

// store
import { changeAlignment } from 'store/pageBuilder/actions';

// types
import { AlignmentVertical } from 'types';

export type TUseClickVerticalAlignmentEvent = TFunc<[AlignmentVertical]>;

export const useClickVerticalAlignmentEvent = (): TUseClickVerticalAlignmentEvent => {
  const dispatch = useDispatch();

  const handleClick = (vertical: AlignmentVertical): void => {
    dispatch(changeAlignment({ vertical }));
  };

  return handleClick;
};
