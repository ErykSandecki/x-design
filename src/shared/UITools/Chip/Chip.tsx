import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
import Box from '../../UI/Box/Box';

// others

// styles
import styles from './chip.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TChipProps = {
  children: ReactNode;
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  onClick?: TFunc;
};

export const Chip: FC<TChipProps> = ({ children, className, e2eValue = '', onClick }) => {
  if (!children) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(styles.Chip, className),
      }}
      e2eAttribute={E2EAttribute.chip}
      e2eValue={e2eValue}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default Chip;
