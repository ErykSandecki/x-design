import { FC, memo, ReactNode, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import Corners from '../../../Corners/Corners';
import { Box } from 'shared';

// hooks
import { useElementEvents } from './hooks/useElementEvents';
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
  isSelectedElementSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// styles
import styles from './element.scss';

// types
import { ElementType, TElement } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { getCornersPosition } from './utils/getCornersPosition';

type TElementProps = {
  classes: typeof classes;
  children: (selected: boolean) => ReactNode;
  id: string;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: ElementType;
};

const Element: FC<TElementProps> = ({
  classes,
  children,
  id,
  mouseMode,
  parentId,
  type,
}) => {
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { positionAbsolute } = elementDynamicData;
  const [position, setPosition] = useState(positionAbsolute);
  const { height, width } = elementDynamicData;
  const { x, y } = position;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const rectCoordinates = getCornersPosition(height, width);
  const events = useElementEvents(
    elementRef,
    id,
    isSelected,
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
            isSelected,
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
      {children(isSelected)}
      {!isMultiple && isSelected && (
        <Corners rectCoordinates={rectCoordinates} />
      )}
    </Box>
  );
};

export default memo(Element);
