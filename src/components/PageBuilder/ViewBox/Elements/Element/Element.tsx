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
import { ElementType, TColor, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';
import { TElementChildren } from './types';

// utils
import { getCssStyles } from './utils/getCssStyles';
import { getLayout } from './utils/getLayout';

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
        <ElementChildren
          angle={angle}
          coordinates={coordinates}
          counterAngle={counterAngle}
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
    </Box>
  );
};

export default memo(Element);
