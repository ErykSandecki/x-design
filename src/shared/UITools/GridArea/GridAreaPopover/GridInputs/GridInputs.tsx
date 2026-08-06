import cx from 'classnames';
import { FC } from 'react';

// components
import E2EDataAttribute from '../../../../E2EDataAttributes/E2EDataAttribute';
import GridInputCells from './GridInputCells';
import { Small } from '../../../../UI/Typography';

// styles
import styles from './grid-inputs.module.scss';

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
    <E2EDataAttribute type={E2EAttribute.gridInputs} value="">
      <div className={cx(styles.GridInputs)}>
        <GridInputCells onBlur={onBlurColumns} onChange={onChangeColumns} name="Columns" value={columns} />
        <Small classes={{ className: cx(styles.GridInputs__separator) }}>x</Small>
        <GridInputCells onBlur={onBlurRows} onChange={onChangeRows} name="Rows" value={rows} />
      </div>
    </E2EDataAttribute>
  );
};

export default GridInputs;
