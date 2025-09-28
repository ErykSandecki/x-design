import { useDispatch } from 'react-redux';

// store
import { changeAlignment } from 'store/pageBuilder/actions';

// types
import { AlignmentHorizontal } from 'types';

export type TUseClickHorizontalAlignmentEvent = TFunc<[AlignmentHorizontal]>;

export const useClickHorizontalAlignmentEvent = (): TUseClickHorizontalAlignmentEvent => {
  const dispatch = useDispatch();

  const handleClick = (horizontal: AlignmentHorizontal): void => {
    dispatch(changeAlignment({ horizontal }));
  };

  return handleClick;
};
