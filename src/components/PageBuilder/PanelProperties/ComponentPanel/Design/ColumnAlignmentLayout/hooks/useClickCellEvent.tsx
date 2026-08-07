import { useDispatch } from 'react-redux';

// store
import { changeLayoutGrid } from 'store/pageBuilder/reducer';

// types
import { TUITypes } from 'shared';

export type TUseClickCellEvent = TFunc<[TUITypes['TActiveCell']]>;

export const useClickCellEvent = (): TUseClickCellEvent => {
  const dispatch = useDispatch();

  const handleClick = (grid: TUITypes['TActiveCell']): void => {
    dispatch(changeLayoutGrid(grid));
  };

  return handleClick;
};
