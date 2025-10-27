import { FC } from 'react';

// components
import Box from '../../UI/Box/Box';
import Cells, { TCellsProps } from './Cells/Cells';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './grid-area.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TGridAreaProps = TCellsProps & {
  e2eValue?: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
};

export const GridArea: FC<TGridAreaProps> = ({ columns, e2eValue = '', fullWidth = false, rows }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.fullWidth,
          fullWidth,
        ]),
      }}
      e2eAttribute={E2EAttribute.gridArea}
      e2eValue={e2eValue}
    >
      <Cells columns={columns} rows={rows} />
    </Box>
  );
};

export default GridArea;
