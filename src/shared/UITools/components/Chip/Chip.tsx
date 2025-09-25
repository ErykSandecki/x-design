import { FC, ReactNode } from 'react';

// components
import Box from '../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './chip.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

export type TChipProps = {
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
};

export const Chip: FC<TChipProps> = ({ children, e2eValue = '' }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!children) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
      e2eAttribute={E2EAttribute.chip}
      e2eValue={e2eValue}
    >
      {children}
    </Box>
  );
};

export default Chip;
