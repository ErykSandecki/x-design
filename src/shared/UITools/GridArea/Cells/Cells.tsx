import cx from 'classnames';
import { FC } from 'react';

// components
import E2EDataAttribute from '../../../E2EDataAttributes/E2EDataAttribute';
import { Small } from '../../../UI/Typography';

// styles
import styles from './cells.module.scss';

// types
import { E2EAttribute } from 'types';

export type TCellsProps = {
  columns: string;
  rows: string;
};

export const Cells: FC<TCellsProps> = ({ columns, rows }) => {
  const parsedColumns = parseInt(columns) || 0;
  const parsedRows = parseInt(rows) || 0;
  const targetColumns = parsedColumns > 10 ? 10 : parsedColumns;
  const targetRows = parsedRows > 10 ? 10 : parsedRows;
  const total = targetColumns * targetRows;

  return (
    <E2EDataAttribute type={E2EAttribute.gridArea} value="">
      <div
        className={cx(styles.Cells)}
        style={{
          gridTemplateColumns: `repeat(${targetColumns}, 1fr)`,
          gridTemplateRows: `repeat(${targetRows}, 1fr)`,
        }}
      >
        {Array.from(Array(total), (_, index) => (
          <div
            className={cx(styles.Cells__cell)}
            key={index}
            style={{
              borderBottomLeftRadius: index === total - targetColumns ? '5px' : 'none',
              borderBottomRightRadius: index === total - 1 ? '5px' : 'none',
              borderTopLeftRadius: index === 0 ? '5px' : 'none',
              borderTopRightRadius: index === targetColumns - 1 ? '5px' : 'none',
            }}
          />
        ))}
        <Small classes={{ className: cx(styles.Cells__sizes) }}>
          {columns} <span>x</span> {rows}
        </Small>
      </div>
    </E2EDataAttribute>
  );
};

export default Cells;
