import { useEffect } from 'react';

// types
import { AlignmentLayout, TLayout } from 'types';

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

    setColumnGap(isMixedColumnGap ? 'Mixed' : column.value.toString());
    setRowGap(isMixedColumnRow ? 'Mixed' : row.value.toString());
  }, [isMixedColumnGap, isMixedColumnRow, isMultiple, layout.gap.column, layout.gap.row]);

  useEffect(() => {
    const { columns, rows } = layout.grid;

    setColumns(isMixedColumns ? 'Mixed' : columns.toString());
    setRows(isMixedRows ? 'Mixed' : rows.toString());
  }, [isMixedColumns, isMixedRows, isMultiple, layout.grid]);
};
