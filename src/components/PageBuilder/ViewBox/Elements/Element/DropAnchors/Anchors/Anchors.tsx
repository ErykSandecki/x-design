import cx from 'classnames';
import { FC, useMemo } from 'react';

// components
import { E2EDataAttribute } from 'shared';

// others
import { ANCHORS_MODIFICATORS } from './constants';

// styles
import styles from './anchors.module.scss';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { E2EAttribute } from 'types';
import { TUseMouseEnterEvent } from '../hooks/useMouseEnterEvent';
import { TUseMouseLeaveEvent } from '../hooks/useMouseLeaveEvent';

// utils
import { getDropAnchorsPosition } from './utils/getDropAnchorsPosition';

export type TAnchorsProps = {
  isFlowVertical: boolean;
  isGrid: boolean;
  onMouseEnter: TUseMouseEnterEvent;
  onMouseLeave: TUseMouseLeaveEvent;
};

const Anchors: FC<TAnchorsProps> = ({ isFlowVertical, isGrid, onMouseEnter, onMouseLeave }) => {
  const anchors = useMemo(() => getDropAnchorsPosition(isFlowVertical, isGrid), [isFlowVertical, isGrid]);

  return anchors.map((position) => (
    <E2EDataAttribute key={position as string} type={E2EAttribute.anchor} value={position as string}>
      <div
        className={cx(styles.Anchors, styles[ANCHORS_MODIFICATORS[position as keyof typeof DropAnchorsPosition]])}
        onMouseEnter={() => onMouseEnter(DropAnchorsPosition[position as keyof typeof DropAnchorsPosition])}
        onMouseLeave={onMouseLeave}
      />
    </E2EDataAttribute>
  ));
};

export default Anchors;
