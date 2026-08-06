import cx from 'classnames';
import { FC } from 'react';

// components
import { E2EDataAttribute } from 'shared';

// hooks
import { useGridDropAreaEvents } from './hooks/useGridDropAreaEvents';

// styles
import styles from './grid-drop-area.module.scss';

// types
import { E2EAttribute, MouseMode, TElement } from 'types';

export type TGridDropAreaProps = {
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const GridDropArea: FC<TGridDropAreaProps> = ({ index, mouseMode, parentId }) => {
  const { isHovered, ...events } = useGridDropAreaEvents(index, mouseMode, parentId);

  return (
    <E2EDataAttribute type={E2EAttribute.box} value="grid-drop-area">
      <div
        className={cx(styles.GridDropArea, {
          [styles['GridDropArea--hovered']]: isHovered,
        })}
        {...events}
      />
    </E2EDataAttribute>
  );
};

export default GridDropArea;
