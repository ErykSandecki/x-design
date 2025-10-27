import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { AlignmentLayout, LayoutType, TLayout } from 'types';
import { TUseBlurGapEvents, useBlurGapEvents } from './useBlurGapEvents';
import { TUseChangeAlignmentLayoutEvent, useChangeAlignmentLayoutEvent } from './useChangeAlignmentEvent';
import { TUseChangeGapEvents, useChangeGapEvents } from './useChangeGapEvents';

// utils
import { isMixed } from '../../utils/isMixed';

export type TUseColumnAlignmentLayoutEvents = TUseBlurGapEvents &
  TUseChangeGapEvents & {
    alignment: AlignmentLayout;
    columnGap: string;
    columns: string;
    isFreeForm: boolean;
    isGrid: boolean;
    isMixedBoxSizing: boolean;
    isMixedColumnGap: boolean;
    isMixedLayout: boolean;
    isMixedColumnRow: boolean;
    layout: TLayout;
    onChangeAlignment: TUseChangeAlignmentLayoutEvent;
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
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMixedAlignment = isMixed(elements, firstElement, 'layout.alignment', selectedElements);
  const isMixedBoxSizing = isMixed(elements, firstElement, 'layout.boxSizing', selectedElements);
  const isMixedColumnGap = isMixed(elements, firstElement, 'layout.gap.column.value', selectedElements);
  const isMixedColumns = isMixed(elements, firstElement, 'layout.grid.columns', selectedElements);
  const isMixedColumnRow = isMixed(elements, firstElement, 'layout.gap.row.value', selectedElements);
  const isMixedRows = isMixed(elements, firstElement, 'layout.grid.rows', selectedElements);
  const isMixedLayout = isMixed(elements, firstElement, 'layout.type', selectedElements);
  const isMultiple = size(selectedElements) > 1;
  const { layout } = element;
  const { type } = layout;
  const isFreeForm = type === LayoutType.freeForm;
  const isGrid = type === LayoutType.grid;
  const showColumnGap = type === LayoutType.horizontal || type === LayoutType.grid;
  const showRowGap = type === LayoutType.vertical || type === LayoutType.grid;
  const onBlurGapEvents = useBlurGapEvents(columnGap, element, rowGap, setColumnGap, setRowGap);
  const onChangeGapEvents = useChangeGapEvents(setColumnGap, setRowGap);

  useEffect(() => {
    setAlignment(isMixedAlignment ? AlignmentLayout.none : layout.alignment);
  }, [layout.alignment, isMultiple]);

  useEffect(() => {
    const { column, row } = element.layout.gap;

    setColumnGap(isMixedColumnGap ? 'Mixed' : column.value.toString());
    setRowGap(isMixedColumnRow ? 'Mixed' : row.value.toString());
  }, [layout.gap.column, layout.gap.row, isMultiple]);

  useEffect(() => {
    const { columns, rows } = element.layout.grid;

    setColumns(isMixedColumns ? 'Mixed' : columns.toString());
    setRows(isMixedRows ? 'Mixed' : rows.toString());
  }, [layout.grid.columns, layout.grid.rows, isMultiple]);

  return {
    ...onBlurGapEvents,
    ...onChangeGapEvents,
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
    onChangeAlignment: useChangeAlignmentLayoutEvent(setAlignment),
    rowGap,
    rows,
    showColumnGap,
    showRowGap,
  };
};
