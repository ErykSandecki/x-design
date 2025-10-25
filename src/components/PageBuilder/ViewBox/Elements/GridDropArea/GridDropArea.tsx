import { FC } from 'react';

// components
import { Box } from 'shared';

// hooks
import { useGridDropAreaEvents } from './hooks/useGridDropAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './grid-drop-area.scss';

// types
import { MouseMode, TElement } from 'types';

export type TGridDropAreaProps = {
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const GridDropArea: FC<TGridDropAreaProps> = ({ index, mouseMode, parentId }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { isHovered, ...events } = useGridDropAreaEvents(index, mouseMode, parentId);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.hovered,
          isHovered,
        ]),
      }}
      e2eValue="grid-drop-area"
      {...events}
    />
  );
};

export default GridDropArea;
