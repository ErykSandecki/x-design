import { FC } from 'react';

// components
import Box from '../../../../UI/Box/Box';
import Tooltip from '../../../../UI/Tooltip/Tooltip';

// hooks
import { useCellsInputEvents } from './hooks/useCellsInputEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { SEPARATOR } from './constants';

// styles
import styles from './cells-input.scss';

// types
import { E2EAttribute } from 'types';
import { TActiveCell } from './types';

export type TCellsInputProps = {
  columns: string;
  onClickCell: TFunc<[TActiveCell]>;
  rows: string;
};

export const CellsInput: FC<TCellsInputProps> = ({ columns, onClickCell, rows }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const parsedColumns = parseInt(columns) || 0;
  const parsedRows = parseInt(rows) || 0;
  const { activeCell, ...events } = useCellsInputEvents(onClickCell);

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[className]),
      }}
      e2eAttribute={E2EAttribute.gridCellsInput}
      style={{
        gridTemplateColumns: `repeat(${12}, 1fr)`,
        gridTemplateRows: `repeat(${8}, 1fr)`,
      }}
      {...events}
    >
      {Array.from(Array(8), (_, row) =>
        Array.from(Array(12), (_, column) => {
          const targetColumn = column + 1;
          const targetRow = row + 1;
          const cellNumber = targetColumn * targetRow;

          return (
            <Tooltip content={`${targetColumn}x${targetRow}`} key={cellNumber}>
              <Box
                classes={{
                  className: cx(
                    classNamesWithTheme.cell.name,
                    [
                      classNamesWithTheme.cell.modificators.active,
                      targetColumn <= activeCell.columns && targetRow <= activeCell.rows,
                    ],
                    [
                      classNamesWithTheme.cell.modificators.selected,
                      targetColumn <= parsedColumns && targetRow <= parsedRows,
                    ],
                  ),
                }}
                data-value={`${targetColumn}${SEPARATOR}${targetRow}`}
                e2eAttribute={E2EAttribute.gridCellInput}
                e2eValue={cellNumber}
              />
            </Tooltip>
          );
        }),
      )}
    </Box>
  );
};

export default CellsInput;
