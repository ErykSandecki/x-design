import { FC, memo, ReactNode, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import Corners from '../../../Corners/Corners';
import { Box } from 'shared';

// hooks
import { useMoveableElementEvents } from './hooks/useMoveableElementEvents';
import { useTheme } from 'hooks';

// others
import {
  className as classNameMoveableELement,
  classNames,
  classes,
} from './classNames';

// store
import {
  elementDynamicDataSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// styles
import styles from './moveable-element.scss';

// types
import { ElementType, TElement } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';
import { getCornersPosition } from './utils/getCornersPosition';

type TProps = {
  classes: typeof classes;
  children: (selected: boolean) => ReactNode;
  id: string;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: ElementType;
};

const MoveableElement: FC<TProps> = ({
  classes,
  children,
  id,
  mouseMode,
  parentId,
  type,
}) => {
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { positionAbsolute } = elementDynamicData;
  const [position, setPosition] = useState(positionAbsolute);
  const { height, width } = elementDynamicData;
  const { x, y } = position;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const rectCoordinates = getCornersPosition(height, width);
  const { selected, ...events } = useMoveableElementEvents(
    elementRef,
    id,
    mouseMode,
    parentId,
    position,
    type,
  );

  return (
    <Box
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[classNameMoveableELement].name,
          [
            classNamesWithTheme[classNameMoveableELement].modificators.selected,
            selected,
          ],
        ),
      }}
      ref={elementRef}
      style={{
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
      }}
      {...events}
    >
      {children(selected)}
      {selected && <Corners rectCoordinates={rectCoordinates} />}
    </Box>
  );
};

export default memo(MoveableElement);
