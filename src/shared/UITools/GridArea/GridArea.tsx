import { FC } from 'react';

// components
import Box from '../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './grid-area.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TGridAreaProps = {
  e2eValue?: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
};

export const GridArea: FC<TGridAreaProps> = ({ e2eValue = '', fullWidth = false }) => {
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
    ></Box>
  );
};

export default GridArea;
