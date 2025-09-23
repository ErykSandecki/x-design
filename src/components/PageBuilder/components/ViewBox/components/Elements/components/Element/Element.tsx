import { FC, memo, ReactNode, useRef } from 'react';
import { isNumber } from 'lodash';
import { useSelector } from 'react-redux';

// components
import EventsArea from './components/EventsArea/EventsArea';
import Outline from './components/Outline/Outline';
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useElementEvents } from './hooks/useElementEvents';
import { useTheme } from 'hooks';

// others
import {
  className as classNameElement,
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
  counterAngleSelectorCreator,
} from 'store/pageBuilder/selectors';

// styles
import styles from './element.scss';

// types
import { ElementType, TColor, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getAbsolutePosition } from '../../../../utils/getAbsolutePosition';
import { getPosition } from './utils/getPosition';
import { isPureNumber } from 'utils';

type TElementProps = {
  classes: typeof classes;
  children: (
    anlge: TElement['angle'],
    coordinates: TElement['coordinates'],
    height: TElement['height'],
    hover: boolean,
    selected: boolean,
    width: TElement['width'],
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
  const counterAngle = useSelector(counterAngleSelectorCreator(parentId));
  const isDraggable = useSelector(isDraggableSelectorCreator(id));
  const isHover = useSelector(isHoverSelectorCreator(id));
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const { itemsRefs, zoomContentRef } = useRefs();
  const { alignment, coordinates } = elementDynamicData;
  const {
    angle,
    background,
    height: cssHeight,
    position,
    width: cssWidth,
  } = elementDynamicData;
  const { x, y } = coordinates;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const isMultipleMoving = useSelector(
    eventSelectorCreator('isMultipleMoving'),
  ) as boolean;
  const isFocused = isHover || isSelected;
  const displayEventsArea = !isDraggable && !isMultiple && isSelected;
  const displayOutline = isFocused;
  const isMoving = isDraggable || (isMultipleMoving && isSelected);
  const { x1, y1 } = getAbsolutePosition(id, itemsRefs, zoomContentRef);
  const height =
    isPureNumber(cssHeight) || !itemsRefs[id]
      ? cssHeight
      : parseInt(getComputedStyle(itemsRefs[id]).height);
  const width =
    isPureNumber(cssWidth) || !itemsRefs[id]
      ? cssWidth
      : parseInt(getComputedStyle(itemsRefs[id]).width);
  const { ...events } = useElementEvents(
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

  return (
    <Box
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[classNameElement].name,
          [classNamesWithTheme[classNameElement].modificators.moving, isMoving],
        ),
      }}
      id={id}
      ref={elementRef}
      style={{
        ...getPosition(alignment, counterAngle, x, y),
        backgroundColor: 'unset',
        height: isNumber(cssHeight) ? `${cssHeight}px` : cssHeight,
        position,
        width: isNumber(cssWidth) ? `${cssWidth}px` : cssWidth,
      }}
    >
      <Box
        attributes={{ [DATA_STATUS_ATTRIBUTE]: isSelected ? 'true' : 'false' }}
        classes={{
          className: cx(classes.className, classNamesWithTheme.wrapper.name, [
            classNamesWithTheme.wrapper.modificators.hover,
            isHover,
          ]),
        }}
        style={{
          backgroundColor: (background.properties as TColor).color,
          height: '100%',
          transform: `rotate(${angle - counterAngle}deg)`,
          width: '100%',
        }}
        {...events}
      >
        {children(angle, coordinates, height, isHover, isSelected, width)}
        {displayOutline && (
          <Outline
            angle={angle - counterAngle}
            height={height}
            x={x1}
            y={y1}
            width={width}
          />
        )}
        {displayEventsArea && (
          <EventsArea
            angle={angle}
            absoluteCoordinates={{ x: x1, y: y1 }}
            counterAngle={counterAngle}
            elementRef={elementRef}
            height={height}
            id={id}
            mouseMode={mouseMode}
            relativeCoordinates={{ x, y }}
            width={width}
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(Element);
