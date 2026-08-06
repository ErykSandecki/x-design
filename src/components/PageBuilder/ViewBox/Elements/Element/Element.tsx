import cx from 'classnames';
import { FC, memo, useRef } from 'react';

// components
import ElementChildren from './ElementChildren';
import { E2EDataAttribute } from 'shared';

// hooks
import { useElementEvents } from './hooks/useElementEvents';

// others
import { DATA_STATUS_ATTRIBUTE } from './constants';

// styles
import styles from './element.module.scss';

// types
import { E2EAttribute, ElementType, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';
import { TElementChildren } from './types';

// utils
import { getBackground } from './utils/getBackground';
import { getBorderInsets } from './utils/getBorderInsets';
import { getInsets } from './utils/getInsets';
import { getLayout } from './utils/getLayout';
import { getPosition } from './utils/getPosition';
import { mapAttributes } from 'utils';

export type TElementProps = {
  classes: { className: string };
  children: TElementChildren;
  id: TElement['id'];
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  type: ElementType;
};

const Element: FC<TElementProps> = ({ classes, children, id, index, mouseMode, parentId, type }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    alignment,
    angle,
    background,
    borderRadius,
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
    mixBlendMode,
    opacity,
    overflow,
    padding,
    position,
    showDropAnchors,
    visible,
    width,
    x,
    y,
    ...events
  } = useElementEvents(elementRef, id, mouseMode, parentId, type);

  return (
    <E2EDataAttribute type={E2EAttribute.element} value={id}>
      <div
        className={cx(classes.className, styles.Element, {
          [styles['Element--hover']]: isHover,
          [styles['Element--moving']]: isMoving,
        })}
        id={id}
        ref={elementRef}
        {...mapAttributes({ [DATA_STATUS_ATTRIBUTE]: isSelected ? 'true' : 'false' })}
        style={{
          ...getBorderInsets(borderRadius),
          ...getLayout(layout),
          ...getPosition(alignment, angle, x, y),
          background: getBackground(background),
          height: cssHeight,
          margin: getInsets(margin),
          maxHeight,
          maxWidth,
          minHeight,
          minWidth,
          mixBlendMode,
          opacity,
          overflow,
          padding: getInsets(padding),
          position,
          visibility: visible ? 'visible' : 'hidden',
          width: cssWidth,
        }}
        {...events}
      >
        {visible && (
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
        )}
      </div>
    </E2EDataAttribute>
  );
};

export default memo(Element);
