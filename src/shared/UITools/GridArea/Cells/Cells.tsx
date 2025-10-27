import { FC } from 'react';

// components
import Box from '../../../UI/Box/Box';
import { Small } from '../../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './cells.scss';

// types
import { E2EAttribute, TGrid } from 'types';

export type TCellsProps = TGrid;

export const Cells: FC<TCellsProps> = ({ columns, rows }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const targetColumns = columns > 10 ? 10 : columns;
  const targetRows = rows > 10 ? 10 : rows;
  const total = targetColumns * targetRows;

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[className]),
      }}
      e2eAttribute={E2EAttribute.gridArea}
      style={{
        gridTemplateColumns: `repeat(${targetColumns}, 1fr)`,
        gridTemplateRows: `repeat(${targetRows}, 1fr)`,
      }}
    >
      {Array.from(Array(total), (_, index) => (
        <Box
          classes={{ className: cx(classNamesWithTheme.cell) }}
          key={index}
          style={{
            borderBottomLeftRadius: index === total - targetColumns ? '5px' : 'none',
            borderBottomRightRadius: index === total - 1 ? '5px' : 'none',
            borderTopLeftRadius: index === 0 ? '5px' : 'none',
            borderTopRightRadius: index === targetColumns - 1 ? '5px' : 'none',
          }}
        />
      ))}
      <Small classes={{ className: cx(classNamesWithTheme.sizes) }}>
        {columns} <span>x</span> {rows}
      </Small>
    </Box>
  );
};

export default Cells;
