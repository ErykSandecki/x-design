// types
import { AlignmentLayout, LayoutType } from './enums';
import { TValueExtended } from '../generic';

export type TGap = {
  column: TValueExtended;
  row: TValueExtended;
};

export type TGrid = {
  columns: number;
  rows: number;
};

export type TLayout = {
  alignment: AlignmentLayout;
  boxSizing: 'included' | 'excluded';
  gap: TGap;
  grid: TGrid;
  type: LayoutType;
  wrap: boolean;
};
