import cx from 'classnames';
import { FC } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Icon from '../../../UI/Icon/Icon';

// others

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
    <Box
      classes={{
        className: cx(styles.DraggableSectionMenu, {
          [styles['DraggableSectionMenu--force-display']]: forceDisplay,
        }),
      }}
    >
      <Icon height={8} name="Menu" width={8} />
    </Box>
  );
};

export default DraggableSectionMenu;
