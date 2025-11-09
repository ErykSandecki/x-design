import { FC, ReactElement, ReactNode } from 'react';

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
  children: ReactNode;
  component?: ReactElement;
  e2eValue?: TE2EDataAttributeProps['value'];
  label?: string;
  separator?: boolean;
};

export const Section: FC<TSectionProps> = ({ children, component, e2eValue = '', label, separator = true }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eAttribute={E2EAttribute.section}
      e2eValue={e2eValue}
    >
      {label && (
        <Box
          classes={{
            className: cx(classNamesWithTheme.labelWrapper.name, [
              classNamesWithTheme.labelWrapper.modificators.separator,
              separator,
            ]),
          }}
        >
          <Small classes={{ className: cx(classNamesWithTheme.label) }}>{label}</Small>
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
