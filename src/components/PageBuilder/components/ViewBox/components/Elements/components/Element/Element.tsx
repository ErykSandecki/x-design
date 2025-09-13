import { createPortal } from 'react-dom';
import { isNumber } from 'lodash';
import { FC, memo, ReactNode, useRef } from 'react';
import { useSelector } from 'react-redux';

// components
import ClickableShadowArea from './ClickableShadowArea/ClickableArea/ClickableShadowArea';
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
  eventSelectorCreator,
  isDraggableSelectorCreator,
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
  const isDraggable = useSelector(isDraggableSelectorCreator(id));
  const isHover = useSelector(isHoverSelectorCreator(id));
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { itemsRefs, overlayContainerRef } = useRefs();
  const { alignment, coordinates } = elementDynamicData;
  const { background, height, position, rotate, width } = elementDynamicData;
  const { x, y } = coordinates;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const rectCoordinates = getCornersPosition(height, width);
  const { ...events } = useElementEvents(
    alignment,
    coordinates,
    elementRef,
    id,
    isMultiple,
    isSelected,
    mouseMode,
    parentId,
    position,
    type,
  );
  const isMultipleMoving = useSelector(
    eventSelectorCreator('isMultipleMoving'),
  ) as boolean;
  const isFocused = isHover || isSelected;
  const displayEventsArea = !isDraggable && !isMultiple && isSelected;
  const displayOutline = isFocused;
  const isMoving = isDraggable || (isMultipleMoving && isSelected);
  const { x1, y1 } = getAbsolutePosition(coordinates, id, parentId, itemsRefs);

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
            isMoving,
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
            classes={{ className: cx(classNamesWithTheme.outline) }}
            style={{
              height,
              left: `${x1}px`,
              top: `${y1}px`,
              width,
            }}
          />,
          overlayContainerRef.current,
        )}
      {displayEventsArea &&
        createPortal(
          <Box
            style={{ left: `${x1}px`, top: `${y1}px` }}
            sx={{ position: 'absolute' }}
          >
            <ClickableShadowArea height={height} width={width} />
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
