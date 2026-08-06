import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// styles
import styles from './chip.scss';

// types
import { E2EAttribute } from 'types';

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
    <E2EDataAttribute type={E2EAttribute.chip} value={e2eValue}>
      <div className={cx(styles.Chip, className)} onClick={onClick}>
        {children}
      </div>
    </E2EDataAttribute>
  );
};

export default Chip;
