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
import { GridColumnType } from './enums';

export type TSectionColumnProps = {
  buttonsIcon?: Array<ReactNode>;
  children: ReactNode;
  gridColumnType?: GridColumnType;
  labels?: [string] | [string, string];
  withMargin?: boolean;
};

export const SectionColumn: FC<TSectionColumnProps> = ({
  buttonsIcon = [],
  children,
  gridColumnType = GridColumnType.single,
  labels = [],
  withMargin = false,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const buttonsWidthTotal = (size(buttonsIcon) || 1) * 24;
  const additionalGap = size(buttonsIcon) === 2 ? 2.5 : 0;
  const width = `calc(100% - ${buttonsWidthTotal}px - ${additionalGap}px - 8px)`;

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.withMargin,
          withMargin,
        ]),
      }}
      e2eAttribute={E2EAttribute.section}
    >
      <div className={cx(classNamesWithTheme.labels)} style={{ width }}>
        {!!size(labels) &&
          labels.map((label, index) => (
            <Small classes={{ className: cx(classNamesWithTheme.label) }} key={index}>
              {label}
            </Small>
          ))}
      </div>
      <div className={cx(classNamesWithTheme.wrapper)}>
        <div
          className={cx(classNamesWithTheme.content.name, classNamesWithTheme.content.modificators[gridColumnType])}
          style={{ width }}
        >
          {children}
        </div>
        <div className={cx(classNamesWithTheme.buttons)}>{buttonsIcon.map((buttonIcon) => buttonIcon)}</div>
      </div>
    </Box>
  );
};

export default SectionColumn;
