import { FC, ReactNode } from 'react';

// components
import Box from '../../../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section-column.scss';

// types
import { E2EAttribute } from 'types';

export type TSectionColumnProps = {
  buttonIcon?: ReactNode;
  children: ReactNode;
};

export const SectionColumn: FC<TSectionColumnProps> = ({
  children,
  buttonIcon,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eAttribute={E2EAttribute.section}
    >
      <div className={cx(classNamesWithTheme.content)}>{children}</div>
      <div className={cx(classNamesWithTheme.button)}>{buttonIcon}</div>
    </Box>
  );
};

export default SectionColumn;
