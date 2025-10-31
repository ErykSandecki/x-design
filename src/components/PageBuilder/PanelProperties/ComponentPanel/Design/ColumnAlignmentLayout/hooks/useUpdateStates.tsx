import { useEffect } from 'react';

// types
import { AlignmentLayout, TLayout } from 'types';

// utils
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

export type TUseChangeAlignmentLayoutEvent = void;

export const useUpdateStates = (
  isMixedAlignment: boolean,
  isMixedColumnGap: boolean,
  isMixedColumnRow: boolean,
  isMixedColumns: boolean,
  isMixedRows: boolean,
  isMultiple: boolean,
  layout: TLayout,
  setAlignment: TFunc<[AlignmentLayout]>,
  setColumnGap: TFunc<[string]>,
  setColumns: TFunc<[string]>,
  setRowGap: TFunc<[string]>,
  setRows: TFunc<[string]>,
): TUseChangeAlignmentLayoutEvent => {
  useEffect(() => {
    setAlignment(isMixedAlignment ? AlignmentLayout.none : layout.alignment);
  }, [isMixedAlignment, isMultiple, layout.alignment]);

  useEffect(() => {
    const { column, row } = layout.gap;

    setColumnGap(normalizeMultipleValue(isMixedColumnGap, column.value));
    setRowGap(normalizeMultipleValue(isMixedColumnRow, row.value));
  }, [isMixedColumnGap, isMixedColumnRow, isMultiple, layout.gap.column, layout.gap.row]);

  useEffect(() => {
    const { columns, rows } = layout.grid;

    setColumns(normalizeMultipleValue(isMixedColumns, columns));
    setRows(normalizeMultipleValue(isMixedRows, rows));
  }, [isMixedColumns, isMixedRows, isMultiple, layout.grid]);
};
