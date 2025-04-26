import { FC, ReactNode } from 'react';
import { size } from 'lodash';

// components
import Box from '../../../../../UI/components/Box/Box';
import { Small } from '../../../../../UI/components/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section-column.scss';

// types
import { E2EAttribute } from 'types';

export type TSectionColumnProps = {
  buttonsIcon?: Array<ReactNode>;
  children: ReactNode;
  labels?: [string] | [string, string];
};

export const SectionColumn: FC<TSectionColumnProps> = ({
  buttonsIcon = [],
  children,
  labels = [],
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const buttonsWidthTotal = (size(buttonsIcon) || 1) * 24;
  const additionalGap = size(buttonsIcon) === 2 ? 2.5 : 0;
  const width = `calc(100% - ${buttonsWidthTotal}px - ${additionalGap}px - 8px)`;

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eAttribute={E2EAttribute.section}
    >
      <div className={cx(classNamesWithTheme.labels)} style={{ width }}>
        {!!size(labels) &&
          labels.map((label, index) => (
            <Small
              classes={{ className: cx(classNamesWithTheme.label) }}
              key={index}
            >
              {label}
            </Small>
          ))}
      </div>
      <div className={cx(classNamesWithTheme.wrapper)}>
        <div className={cx(classNamesWithTheme.content)} style={{ width }}>
          {children}
        </div>
        <div className={cx(classNamesWithTheme.buttons)}>
          {buttonsIcon.map((buttonIcon) => buttonIcon)}
        </div>
      </div>
    </Box>
  );
};

export default SectionColumn;
