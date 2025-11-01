import { FC, memo, ReactNode } from 'react';

// components
import Box from '../../UI/Box/Box';
import { Small } from '../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TSectionProps = {
  buttonsIcon?: Array<ReactNode>;
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
  label?: string;
};

export const Section: FC<TSectionProps> = ({ buttonsIcon = [], children, e2eValue = '', label }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eAttribute={E2EAttribute.section}
      e2eValue={e2eValue}
    >
      {label && (
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', mb: 10 }}>
          <Small classes={{ className: cx(classNamesWithTheme.label) }}>{label}</Small>
          <Box sx={{ alignItems: 'center', columnGap: '2.5px', display: 'flex', justifyContent: 'center' }}>
            {buttonsIcon.map((buttonIcon) => buttonIcon)}
          </Box>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default memo(Section);
