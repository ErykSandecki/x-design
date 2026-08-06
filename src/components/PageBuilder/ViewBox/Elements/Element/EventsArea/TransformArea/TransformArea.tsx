import cx from 'classnames';
import { FC, RefObject } from 'react';
import { kebabCase } from 'lodash';

// components
import { E2EDataAttribute } from 'shared';

// hooks
import { useTransformAreaEvents } from './hooks/useTransformAreaEvents';

// others

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import { E2EAttribute, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// styles
import styles from './transform-area.scss';

// utils
import { enumToArray } from 'utils';

const anchorResizeModificators: Record<string, string> = {
  east: 'TransformArea__anchor-resize--east',
  none: 'TransformArea__anchor-resize--none',
  north: 'TransformArea__anchor-resize--north',
  northEast: 'TransformArea__anchor-resize--north-east',
  northWest: 'TransformArea__anchor-resize--north-west',
  south: 'TransformArea__anchor-resize--south',
  southEast: 'TransformArea__anchor-resize--south-east',
  southWest: 'TransformArea__anchor-resize--south-west',
  west: 'TransformArea__anchor-resize--west',
};

const anchorRotateModificators: Record<string, string> = {
  none: 'TransformArea__anchor-rotate--none',
  northEast: 'TransformArea__anchor-rotate--north-east',
  northWest: 'TransformArea__anchor-rotate--north-west',
  southEast: 'TransformArea__anchor-rotate--south-east',
  southWest: 'TransformArea__anchor-rotate--south-west',
};

export type TTransformAreaProps = {
  angle: TElement['angle'];
  counterAngle: number;
  elementRef: RefObject<HTMLDivElement>;
  flip: TElement['flip'];
  height: TElement['height']['value'];
  id: TElement['id'];
  moseMode: MouseMode;
  width: TElement['width']['value'];
  x: TElement['coordinates']['x'];
  y: TElement['coordinates']['y'];
};

const TransformArea: FC<TTransformAreaProps> = ({
  angle,
  counterAngle,
  elementRef,
  flip,
  height,
  id,
  moseMode,
  width,
  x,
  y,
}) => {
  const {
    onMouseDownAnchorResize,
    onMouseDownAnchorRotate,
    onMouseEnterAnchorResize,
    onMouseEnterAnchorRotate,
    onMouseLeaveAnchorResize,
    onMouseLeaveAnchorRotate,
  } = useTransformAreaEvents(angle, counterAngle, elementRef, flip, height, id, moseMode, width, x, y);

  return (
    <div className={cx(styles.TransformArea)} style={{ height, width }}>
      {/* RESIZE AREA */}
      {enumToArray(AnchorResize)
        .filter((anchor) => anchor !== AnchorRotate.none)
        .map((anchor) => (
          <E2EDataAttribute
            key={anchor as keyof typeof AnchorResize}
            type={E2EAttribute.anchorResize}
            value={kebabCase(anchor as string)}
          >
            <div
              className={cx(
                styles['TransformArea__anchor-resize'],
                styles[anchorResizeModificators[anchor as keyof typeof AnchorResize]],
              )}
              onMouseDown={(event) => onMouseDownAnchorResize(anchor as AnchorResize, event)}
              onMouseEnter={() => onMouseEnterAnchorResize(anchor as AnchorResize)}
              onMouseLeave={onMouseLeaveAnchorResize}
            />
          </E2EDataAttribute>
        ))}

      {/* ROTATE AREA */}
      {enumToArray(AnchorRotate)
        .filter((anchor) => anchor !== AnchorRotate.none)
        .map((anchor) => (
          <E2EDataAttribute
            key={anchor as keyof typeof AnchorRotate}
            type={E2EAttribute.anchorRotate}
            value={kebabCase(anchor as string)}
          >
            <div
              className={cx(
                styles['TransformArea__anchor-rotate'],
                styles[anchorRotateModificators[anchor as keyof typeof AnchorRotate]],
              )}
              onMouseDown={(event) => onMouseDownAnchorRotate(anchor as AnchorRotate, event)}
              onMouseEnter={() => onMouseEnterAnchorRotate(anchor as AnchorRotate)}
              onMouseLeave={onMouseLeaveAnchorRotate}
            />
          </E2EDataAttribute>
        ))}
    </div>
  );
};

export default TransformArea;
