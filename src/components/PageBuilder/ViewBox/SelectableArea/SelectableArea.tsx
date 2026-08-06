import cx from 'classnames';
import { FC } from 'react';

// components
import { Box } from 'shared';

// others

// styles
import styles from './selectable-area.scss';

// types
import { TRectAreaExtended } from '../../types';

export type TSelectableAreaProps = {
  selectableArea: TRectAreaExtended;
};

const SelectableArea: FC<TSelectableAreaProps> = ({ selectableArea }) => {
  const { x1, x2, y1, y2 } = selectableArea || {};

  if (!selectableArea || !selectableArea.visible) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(styles.SelectableArea),
      }}
    >
      <svg className={cx(styles.SelectableArea__area)}>
        <path d={`M ${x1},${y1} H ${x2} V ${y2} H ${x1} V ${y1}`} />
      </svg>
    </Box>
  );
};

export default SelectableArea;
