import { FC } from 'react';

// components
import Box from '../../../../UI/Box/Box';
import GridInputCells from './GridInputCells';
import { Small } from '../../../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './grid-inputs.scss';

// types
import { E2EAttribute } from 'types';

export type TGridInputsProps = {
  columns: string;
  rows: string;
};

export const GridInputs: FC<TGridInputsProps> = ({ columns, rows }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[className]),
      }}
      e2eAttribute={E2EAttribute.gridInputs}
    >
      <GridInputCells name="Columns" value={columns} />
      <Small classes={{ className: cx(classNamesWithTheme.separator) }}>x</Small>
      <GridInputCells name="Rows" value={rows} />
    </Box>
  );
};

export default GridInputs;
