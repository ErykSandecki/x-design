import { FC } from 'react';

// components
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './selectable-area.scss';

// types
import { TRectAreaExtended } from '../../../../types';

export type TSelectableAreaProps = {
  selectableArea: TRectAreaExtended;
};

const SelectableArea: FC<TSelectableAreaProps> = ({ selectableArea }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, x2, y1, y2 } = selectableArea || {};

  if (!selectableArea || !selectableArea.visible) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
    >
      <svg className={cx(classNamesWithTheme.area)}>
        <path d={`M ${x1},${y1} H ${x2} V ${y2} H ${x1} V ${y1}`} />
      </svg>
    </Box>
  );
};

export default SelectableArea;
