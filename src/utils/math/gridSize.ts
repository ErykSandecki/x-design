// types
import { TGrid } from 'types';

export const gridSize = (totalChildren: number, totalColumns: number): TGrid => {
  const cols = Math.min(totalColumns, totalChildren);
  const rows = Math.ceil(totalChildren / cols);

  return { columns: cols, rows };
};
