import cx from 'classnames';
import { FC } from 'react';

// components
import Box from '../../../../UI/Box/Box';
import GridInputCells from './GridInputCells';
import { Small } from '../../../../UI/Typography';

// others

// styles
import styles from './grid-inputs.scss';

// types
import { E2EAttribute } from 'types';

export type TGridInputsProps = {
  columns: string;
  onBlurColumns: TFunc;
  onBlurRows: TFunc;
  onChangeColumns: TFunc<[string, boolean?]>;
  onChangeRows: TFunc<[string, boolean?]>;
  rows: string;
};

export const GridInputs: FC<TGridInputsProps> = ({
  columns,
  onBlurColumns,
  onBlurRows,
  onChangeColumns,
  onChangeRows,
  rows,
}) => {
  return (
    <Box
      classes={{
        className: cx('GridInputs', styles.GridInputs),
      }}
      e2eAttribute={E2EAttribute.gridInputs}
    >
      <GridInputCells onBlur={onBlurColumns} onChange={onChangeColumns} name="Columns" value={columns} />
      <Small classes={{ className: cx(styles.GridInputs__separator) }}>x</Small>
      <GridInputCells onBlur={onBlurRows} onChange={onChangeRows} name="Rows" value={rows} />
    </Box>
  );
};

export default GridInputs;
