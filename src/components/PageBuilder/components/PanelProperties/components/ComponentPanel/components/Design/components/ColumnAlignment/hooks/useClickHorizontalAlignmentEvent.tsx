import { useDispatch } from 'react-redux';

// store
import { changeAlignment } from 'store/pageBuilder/actions';

// types
import { AlignmentHorizontal } from 'types';

type TUseClickHorizontalAlignmentEvent = (
  horizontal: AlignmentHorizontal,
) => void;

export const useClickHorizontalAlignmentEvent =
  (): TUseClickHorizontalAlignmentEvent => {
    const dispatch = useDispatch();

    const handleClick = (horizontal: AlignmentHorizontal): void => {
      dispatch(changeAlignment({ horizontal }));
    };

    return handleClick;
  };
