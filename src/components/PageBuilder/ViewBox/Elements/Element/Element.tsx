import { FC, memo, ReactNode, useRef } from 'react';

// components
import DropAnchors from './DropAnchors/DropAnchors';
import EventsArea from './EventsArea/EventsArea';
import Outline from './Outline/Outline';
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useElementEvents } from './hooks/useElementEvents';
import { useTheme } from 'hooks';

// others
import { className as classNameElement, classNames, classes } from './classNames';
import { DATA_STATUS_ATTRIBUTE } from './constants';

// styles
import styles from './element.scss';

// types
import { ElementType, TColor, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getAbsolutePosition } from '../../utils/getAbsolutePosition';
import { getCssStyles } from './utils/getCssStyles';
import { getLayout } from './utils/getLayout';

export type TElementProps = {
  classes: typeof classes;
  children: (
    anlge: TElement['angle'],
    coordinates: TElement['coordinates'],
    height: TElement['height']['value'],
    hover: boolean,
    selected: boolean,
    width: TElement['width']['value'],
  ) => ReactNode;
  id: TElement['id'];
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: ElementType;
};

const Element: FC<TElementProps> = ({ classes, children, id, index, mouseMode, parentId, type }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { itemsRefs, zoomContentRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, y1 } = getAbsolutePosition(id, itemsRefs, zoomContentRef);

  const {
    alignment,
    angle,
    background,
    coordinates,
    counterAngle,
    cssHeight,
    cssWidth,
    displayEventsArea,
    displayOutline,
    flip,
    height,
    isHover,
    isMoving,
    isSelected,
    layout,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    showDropAnchors,
    width,
    x,
    y,
    ...events
  } = useElementEvents(elementRef, id, mouseMode, parentId, type);

  return (
    <Box
      classes={{
        className: cx(classes.className, classNamesWithTheme[classNameElement].name, [
          classNamesWithTheme[classNameElement].modificators.moving,
          isMoving,
        ]),
      }}
      id={id}
      ref={elementRef}
      style={{
        ...getCssStyles(alignment, counterAngle, x, y),
        backgroundColor: 'unset',
        height: cssHeight,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        position,
        width: cssWidth,
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
        sx={{ overflow: 'hidden', position: 'relative' }}
        {...events}
      >
        {showDropAnchors && <DropAnchors id={id} index={index} mouseMode={mouseMode} parentId={parentId} />}
        {children(angle, coordinates, height, isHover, isSelected, width)}
        {displayOutline && <Outline angle={angle - counterAngle} height={height} x={x1} y={y1} width={width} />}
        {displayEventsArea && (
          <EventsArea
            angle={angle}
            absoluteCoordinates={{ x: x1, y: y1 }}
            counterAngle={counterAngle}
            elementRef={elementRef}
            flip={flip}
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
