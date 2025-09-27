import { FC, ReactNode } from 'react';

// components
import Box from '../../..//UI/components/Box/Box';
import { Small } from '../../../UI/components/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section.scss';

// types
import { E2EAttribute } from 'types';

export type TSectionProps = {
  buttonsIcon?: Array<ReactNode>;
  children: ReactNode;
  label?: string;
};

export const Section: FC<TSectionProps> = ({ buttonsIcon = [], children, label }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box classes={{ className: cx(classNamesWithTheme[className]) }} e2eAttribute={E2EAttribute.section}>
      {label && (
        <div className={cx(classNamesWithTheme.header)}>
          <Small classes={{ className: cx(classNamesWithTheme.label) }}>{label}</Small>
          <div className={cx(classNamesWithTheme.buttons)}>{buttonsIcon.map((buttonIcon) => buttonIcon)}</div>
        </div>
      )}
      {children}
    </Box>
  );
};

export default Section;
