import { createPortal } from 'react-dom';
import { FC, memo, ReactNode, useRef } from 'react';
import { isNumber } from 'lodash';
import { useSelector } from 'react-redux';

// components
import Corners from '../../../Corners/Corners';
import TransformArea from '../../../TransformArea/TransformArea';
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useElementEvents } from './hooks/useElementEvents';
import { useTheme } from 'hooks';

// others
import {
  className as classNameMoveableELement,
  classNames,
  classes,
} from './classNames';
import { DATA_STATUS_ATTRIBUTE } from './constants';

// store
import {
  elementDynamicDataSelectorCreator,
  eventsSelector,
  isHoverSelectorCreator,
  isSelectedElementSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// styles
import styles from './element.scss';

// types
import { ElementType, TColor, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getAbsolutePosition } from 'components/PageBuilder/components/ViewBox/utils/getAbsolutePosition';
import { getCornersPosition } from './utils/getCornersPosition';
import { getPosition } from './utils/getPosition';

type TElementProps = {
  classes: typeof classes;
  children: (
    coordinates: TElement['coordinates'],
    hover: boolean,
    selected: boolean,
  ) => ReactNode;
  id: TElement['id'];
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
  const isHover = useSelector(isHoverSelectorCreator(id));
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { isMultipleMoving } = useSelector(eventsSelector);
  const { itemsRefs, overlayContainerRef } = useRefs();
  const { alignment, coordinates } = elementDynamicData;
  const { background, height, position, rotate, width } = elementDynamicData;
  const { x, y } = coordinates;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const rectCoordinates = getCornersPosition(height, width);
  const { isMoving, ...events } = useElementEvents(
    alignment,
    coordinates,
    elementRef,
    height,
    id,
    isMultiple,
    isSelected,
    mouseMode,
    parentId,
    type,
    width,
  );
  const displayOutline = !isMultiple && isSelected;
  const { x1, y1 } = (displayOutline &&
    getAbsolutePosition(coordinates, id, parentId, itemsRefs)) || {
    x1: 0,
    y1: 0,
  };

  return (
    <Box
      attributes={{ [DATA_STATUS_ATTRIBUTE]: isSelected ? 'true' : 'false' }}
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[classNameMoveableELement].name,
          [
            classNamesWithTheme[classNameMoveableELement].modificators.hover,
            isHover,
          ],
          [
            classNamesWithTheme[classNameMoveableELement].modificators.moving,
            isMoving || (isMultipleMoving && isSelected),
          ],
          [
            classNamesWithTheme[classNameMoveableELement].modificators.selected,
            isSelected,
          ],
        ),
      }}
      id={id}
      ref={elementRef}
      style={{
        ...getPosition(alignment, rotate, x, y),
        backgroundColor: (background.properties as TColor).color,
        height: isNumber(height) ? `${height}px` : height,
        position,
        width: isNumber(width) ? `${width}px` : width,
      }}
      {...events}
    >
      {children(coordinates, isHover, isSelected)}
      {displayOutline &&
        createPortal(
          <Box
            style={{ left: `${x1}px`, top: `${y1}px` }}
            sx={{ position: 'absolute' }}
          >
            <Corners rectCoordinates={rectCoordinates} />
            <TransformArea
              height={height}
              id={id}
              moseMode={mouseMode}
              x={x}
              y={y}
              width={width}
            />
          </Box>,
          overlayContainerRef.current,
        )}
    </Box>
  );
};

export default memo(Element);
