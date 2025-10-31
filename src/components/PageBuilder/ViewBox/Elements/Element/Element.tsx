import { FC, memo, useRef } from 'react';

// components
import ElementChildren from './ElementChildren';
import { Box } from 'shared';

// hooks
import { useElementEvents } from './hooks/useElementEvents';
import { useTheme } from 'hooks';

// others
import { className as classNameElement, classNames, classes } from './classNames';
import { DATA_STATUS_ATTRIBUTE } from './constants';

// styles
import styles from './element.scss';

// types
import { E2EAttribute, ElementType, TColor, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';
import { TElementChildren } from './types';

// utils
import { getInsets } from './utils/getInsets';
import { getLayout } from './utils/getLayout';
import { getPosition } from './utils/getPosition';

export type TElementProps = {
  classes: typeof classes;
  children: TElementChildren;
  id: TElement['id'];
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: ElementType;
};

const Element: FC<TElementProps> = ({ classes, children, id, index, mouseMode, parentId, type }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const {
    alignment,
    angle,
    background,
    coordinates,
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
    margin,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    padding,
    position,
    showDropAnchors,
    width,
    x,
    y,
    ...events
  } = useElementEvents(elementRef, id, mouseMode, parentId, type);

  return (
    <Box
      attributes={{ [DATA_STATUS_ATTRIBUTE]: isSelected ? 'true' : 'false' }}
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[classNameElement].name,
          [classNamesWithTheme[classNameElement].modificators.hover, isHover],
          [classNamesWithTheme[classNameElement].modificators.moving, isMoving],
        ),
      }}
      e2eAttribute={E2EAttribute.element}
      e2eValue={id}
      id={id}
      ref={elementRef}
      style={{
        ...getLayout(layout),
        ...getPosition(alignment, angle, x, y),
        backgroundColor: (background.properties as TColor).color,
        height: cssHeight,
        margin: getInsets(margin),
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        padding: getInsets(padding),
        position,
        width: cssWidth,
      }}
      {...events}
    >
      <ElementChildren
        angle={angle}
        coordinates={coordinates}
        displayEventsArea={displayEventsArea}
        displayOutline={displayOutline}
        elementRef={elementRef}
        flip={flip}
        height={height}
        id={id}
        index={index}
        isHover={isHover}
        isSelected={isSelected}
        mouseMode={mouseMode}
        parentId={parentId}
        showDropAnchors={showDropAnchors}
        width={width}
        x={x}
        y={y}
      >
        {children}
      </ElementChildren>
    </Box>
  );
};

export default memo(Element);
