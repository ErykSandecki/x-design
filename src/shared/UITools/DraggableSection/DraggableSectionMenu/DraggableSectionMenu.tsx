import { FC } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Icon from '../../../UI/Icon/Icon';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './draggable-section-menu.scss';

export type TDraggableSectionMenuProps = {
  forceDisplay: boolean;
  show: boolean;
};

export const DraggableSectionMenu: FC<TDraggableSectionMenuProps> = ({ forceDisplay, show }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!show) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.forceDisplay,
          forceDisplay,
        ]),
      }}
    >
      <Icon height={8} name="Menu" width={8} />
    </Box>
  );
};

export default DraggableSectionMenu;
