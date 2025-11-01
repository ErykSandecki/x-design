import { useDispatch } from 'react-redux';

// store
import { setElementsGap } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseBlurGapEvents = {
  onBlurColumnGap: TFunc;
  onBlurRowGap: TFunc;
};

export const useBlurGapEvents = (
  columnGap: string,
  layout: TElement['layout'],
  rowGap: string,
  setColumnGap: TFunc<[string]>,
  setRowGap: TFunc<[string]>,
): TUseBlurGapEvents => {
  const dispatch = useDispatch();

  const handleBlurColumnGap = (): void => {
    if (columnGap === '') {
      setColumnGap(layout.gap.column.value.toString());
    } else {
      dispatch(setElementsGap('column', parseFloat(columnGap)));
    }
  };

  const handleBlurRowGap = (): void => {
    if (rowGap === '') {
      setRowGap(layout.gap.row.value.toString());
    } else {
      dispatch(setElementsGap('row', parseFloat(rowGap)));
    }
  };

  return {
    onBlurColumnGap: handleBlurColumnGap,
    onBlurRowGap: handleBlurRowGap,
  };
};
