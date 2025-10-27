import { useDispatch } from 'react-redux';

// store
import { changeLayoutGrid } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurGridEvents = {
  onBlurColumns: TFunc;
  onBlurRows: TFunc;
};

export const useBlurGridEvents = (
  columns: string,
  element: TElement,
  rows: string,
  setColumns: TFunc<[string]>,
  setRows: TFunc<[string]>,
): TUseBlurGridEvents => {
  const dispatch = useDispatch();
  const exceedRange = (value: string): boolean => {
    const amount = parseInt(value);
    return amount <= 0 || amount > 100;
  };

  const handleBlurColumns = (): void => {
    if (columns === '' || exceedRange(columns)) {
      setColumns(element.layout.grid.columns.toString());
    } else {
      dispatch(changeLayoutGrid({ columns: parseInt(columns) }));
    }
  };

  const handleBlurRows = (): void => {
    if (rows === '' || exceedRange(rows)) {
      setRows(element.layout.grid.rows.toString());
    } else {
      dispatch(changeLayoutGrid({ rows: parseInt(rows) }));
    }
  };

  return {
    onBlurColumns: handleBlurColumns,
    onBlurRows: handleBlurRows,
  };
};
