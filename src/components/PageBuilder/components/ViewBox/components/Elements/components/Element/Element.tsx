import { FC, memo, ReactNode, useRef } from 'react';
import { isNumber } from 'lodash';

// components
import DropAnchors from './components/DropAnchors/DropAnchors';
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

// styles
import styles from './element.scss';

// types
import { ElementType, TColor, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getAbsolutePosition } from '../../../../utils/getAbsolutePosition';
import { getPosition } from './utils/getPosition';
import { getLayout } from './utils/getLayout';

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
  const elementRef = useRef<HTMLDivElement>(null);
  const { itemsRefs, zoomContentRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, y1 } = getAbsolutePosition(id, itemsRefs, zoomContentRef);
  const element = useElementEvents(elementRef, id, mouseMode, parentId, type);
  const {
    alignment,
    angle,
    background,
    coordinates,
    counterAngle,
    cssHeight,
    cssWidth,
    displayEventsArea,
    height,
    displayOutline,
    isHover,
    isMoving,
    isSelected,
    layout,
    position,
    width,
    x,
    y,
    ...events
  } = element;

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
          className: cx(
            classNamesWithTheme.wrapper.name,
            [classNamesWithTheme.wrapper.modificators.hover, isHover],
            [classNamesWithTheme.wrapper.modificators.moving, isMoving],
          ),
        }}
        style={{
          ...getLayout(layout),
          backgroundColor: (background.properties as TColor).color,
          height: '100%',
          transform: `rotate(${angle - counterAngle}deg)`,
          width: '100%',
        }}
        {...events}
      >
        {!isSelected && position === 'relative' && (
          <DropAnchors id={id} mouseMode={mouseMode} parentId={parentId} />
        )}
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
