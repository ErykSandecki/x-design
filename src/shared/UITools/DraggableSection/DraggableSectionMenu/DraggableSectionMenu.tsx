import cx from 'classnames';
import { FC } from 'react';

// components
import Icon from '../../../UI/Icon/Icon';

// styles
import styles from './draggable-section-menu.scss';

export type TDraggableSectionMenuProps = {
  forceDisplay: boolean;
  show: boolean;
};

export const DraggableSectionMenu: FC<TDraggableSectionMenuProps> = ({ forceDisplay, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className={cx(styles.DraggableSectionMenu, {
        [styles['DraggableSectionMenu--force-display']]: forceDisplay,
      })}
    >
      <Icon height={8} name="Menu" width={8} />
    </div>
  );
};

export default DraggableSectionMenu;
