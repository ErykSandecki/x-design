import { useDispatch } from 'react-redux';

// store
import { changeLayoutGrid } from 'store/pageBuilder/actions';

// types
import { TGrid } from 'types';

export type TUseChangeGridEvents = {
  onChangeColumns: TFunc<[string, boolean?]>;
  onChangeRows: TFunc<[string, boolean?]>;
};

export const useChangeGridEvents = (setColumns: TFunc<[string]>, setRows: TFunc<[string]>): TUseChangeGridEvents => {
  const dispatch = useDispatch();

  const updateStore = (grid: keyof TGrid, isScrubbableInput: boolean, value: string): void => {
    if (isScrubbableInput) {
      dispatch(changeLayoutGrid({ [grid]: parseInt(value) }));
    }
  };

  const handleChangeColumns = (value: string, isScrubbableInput: boolean): void => {
    setColumns(value);
    updateStore('columns', isScrubbableInput, value);
  };

  const handleChangeRows = (value: string, isScrubbableInput: boolean): void => {
    setRows(value);
    updateStore('rows', isScrubbableInput, value);
  };

  return {
    onChangeColumns: handleChangeColumns,
    onChangeRows: handleChangeRows,
  };
};
