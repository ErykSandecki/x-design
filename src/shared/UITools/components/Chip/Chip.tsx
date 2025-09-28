import { FC, ReactNode } from 'react';

// components
import Box from '../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameChip, classNames } from './classNames';

// styles
import styles from './chip.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

export type TChipProps = {
  children: ReactNode;
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
};

export const Chip: FC<TChipProps> = ({ children, className, e2eValue = '' }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!children) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[classNameChip], className),
      }}
      e2eAttribute={E2EAttribute.chip}
      e2eValue={e2eValue}
    >
      {children}
    </Box>
  );
};

export default Chip;
