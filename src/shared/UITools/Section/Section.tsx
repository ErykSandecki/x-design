import cx from 'classnames';
import { FC, ReactElement, ReactNode } from 'react';

// components
import Box from '../../UI/Box/Box';
import { Small } from '../../UI/Typography';

// others

// styles
import styles from './section.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TSectionProps = {
  children: ReactNode;
  component?: ReactElement;
  e2eValue?: TE2EDataAttributeProps['value'];
  label?: string;
  separator?: boolean;
};

export const Section: FC<TSectionProps> = ({ children, component, e2eValue = '', label, separator = true }) => {
  return (
    <Box classes={{ className: cx(styles.Section) }} e2eAttribute={E2EAttribute.section} e2eValue={e2eValue}>
      {label && (
        <Box
          classes={{
            className: cx(styles['Section__label-wrapper'], {
              [styles['Section__label-wrapper--separator']]: separator,
            }),
          }}
        >
          <Small classes={{ className: cx(styles.Section__label) }}>{label}</Small>
          <Box sx={{ alignItems: 'center', columnGap: '2.5px', display: 'flex', justifyContent: 'center' }}>
            {component}
          </Box>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default Section;
