import cx from 'classnames';
import { FC, ReactElement, ReactNode } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { Small } from '../../UI/Typography';

// styles
import styles from './section.module.scss';

// types
import { E2EAttribute } from 'types';

export type TSectionProps = {
  children: ReactNode;
  component?: ReactElement;
  e2eValue?: TE2EDataAttributeProps['value'];
  label?: string;
  separator?: boolean;
};

export const Section: FC<TSectionProps> = ({ children, component, e2eValue = '', label, separator = true }) => {
  return (
    <E2EDataAttribute type={E2EAttribute.section} value={e2eValue}>
      <div className={cx(styles.Section)}>
        {label && (
          <div
            className={cx(styles['Section__label-wrapper'], {
              [styles['Section__label-wrapper--separator']]: separator,
            })}
          >
            <Small classes={{ className: cx(styles.Section__label) }}>{label}</Small>
            <div className={cx(styles['Section__label-component'])}>{component}</div>
          </div>
        )}
        {children}
      </div>
    </E2EDataAttribute>
  );
};

export default Section;
