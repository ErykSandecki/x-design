import { useState } from 'react';
import { useSelector } from 'react-redux';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { useUpdateStates } from './useUpdateStates';

// types
import { AlignmentLayout, LayoutType, TLayout } from 'types';
import { TUseBlurGapEvents, useBlurGapEvents } from './useBlurGapEvents';
import { TUseBlurGridEvents, useBlurGridEvents } from './useBlurGridEvents';
import { TUseChangeAlignmentLayoutEvent, useChangeAlignmentLayoutEvent } from './useChangeAlignmentEvent';
import { TUseChangeGapEvents, useChangeGapEvents } from './useChangeGapEvents';
import { TUseChangeGridEvents, useChangeGridEvents } from './useChangeGridEvents';
import { TUseClickCellEvent, useClickCellEvent } from './useClickCellEvent';

export type TUseColumnAlignmentLayoutEvents = TUseBlurGapEvents &
  TUseBlurGridEvents &
  TUseChangeGapEvents &
  TUseChangeGridEvents & {
    alignment: AlignmentLayout;
    columnGap: string;
    columns: string;
    isFreeForm: boolean;
    isGrid: boolean;
    isMixedBoxSizing: boolean;
    isMixedColumnGap: boolean;
    isMixedColumnRow: boolean;
    isMixedLayout: boolean;
    layout: TLayout;
    onChangeAlignment: TUseChangeAlignmentLayoutEvent;
    onClickCell: TUseClickCellEvent;
    rowGap: string;
    rows: string;
    showColumnGap: boolean;
    showRowGap: boolean;
  };

export const useColumnAlignmentLayoutEvents = (): TUseColumnAlignmentLayoutEvents => {
  const [alignment, setAlignment] = useState(AlignmentLayout.none);
  const [columnGap, setColumnGap] = useState('');
  const [columns, setColumns] = useState('');
  const [rowGap, setRowGap] = useState('');
  const [rows, setRows] = useState('');
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedAlignment = useSelector(isMixedSelectorCreator('layout.alignment'));
  const isMixedBoxSizing = useSelector(isMixedSelectorCreator('layout.boxSizing'));
  const isMixedColumnGap = useSelector(isMixedSelectorCreator('layout.gap.column.value'));
  const isMixedColumns = useSelector(isMixedSelectorCreator('layout.grid.columns'));
  const isMixedColumnRow = useSelector(isMixedSelectorCreator('layout.gap.row.value'));
  const isMixedRows = useSelector(isMixedSelectorCreator('layout.grid.rows'));
  const isMixedLayout = useSelector(isMixedSelectorCreator('layout.type'));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const layout = useSelector(elementAttributeSelectorCreator('layout', firstElementId));
  const { type } = layout;
  const isFreeForm = type === LayoutType.freeForm;
  const isGrid = type === LayoutType.grid;
  const showColumnGap = type === LayoutType.horizontal || type === LayoutType.grid;
  const showRowGap = type === LayoutType.vertical || type === LayoutType.grid;
  const onBlurGapEvents = useBlurGapEvents(columnGap, layout, rowGap, setColumnGap, setRowGap);
  const onBlurGridEvents = useBlurGridEvents(columns, layout, rows, setColumns, setRows);
  const onChangeAlignment = useChangeAlignmentLayoutEvent(setAlignment);
  const onChangeGapEvents = useChangeGapEvents(setColumnGap, setRowGap);
  const onChangeGridEvents = useChangeGridEvents(setColumns, setRows);
  const onClickCell = useClickCellEvent();

  useUpdateStates(
    isMixedAlignment,
    isMixedColumnGap,
    isMixedColumnRow,
    isMixedColumns,
    isMixedRows,
    isMultiple,
    layout,
    setAlignment,
    setColumnGap,
    setColumns,
    setRowGap,
    setRows,
  );

  return {
    ...onBlurGapEvents,
    ...onBlurGridEvents,
    ...onChangeGapEvents,
    ...onChangeGridEvents,
    alignment,
    columnGap,
    columns,
    isFreeForm,
    isGrid,
    isMixedBoxSizing,
    isMixedColumnGap,
    isMixedColumnRow,
    isMixedLayout,
    layout,
    onChangeAlignment,
    onClickCell,
    rowGap,
    rows,
    showColumnGap,
    showRowGap,
  };
};
