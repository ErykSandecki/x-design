import { FC } from 'react';
import { useSelector } from 'react-redux';

// components
import { E2EDataAttribute } from 'shared';

// hooks
import { useClickableAreaEvents } from './hooks/useClickableAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { SW } from './constants';

// store
import { areParentsTheSameSelector, eventsSelector } from 'store/pageBuilder/selectors';

// styles
import styles from './clickable-area.scss';

// types
import { E2EAttribute } from 'types';
import { TCoordinatesData } from '../types';

export type TClickableAreaProps = {
  elementsCoordinates: TCoordinatesData['elementsCoordinates'];
  outlineCoordinates: TRectCoordinates;
};

const ClickableArea: FC<TClickableAreaProps> = ({ elementsCoordinates, outlineCoordinates }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { isMultipleMoving } = useSelector(eventsSelector);
  const { onMouseDown } = useClickableAreaEvents();
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const height = outlineCoordinates.y2 - outlineCoordinates.y1;
  const width = outlineCoordinates.x2 - outlineCoordinates.x1;

  if (isMultipleMoving) {
    return null;
  }

  return (
    <>
      {/* OUTLINE */}
      {areParentsTheSame && (
        <E2EDataAttribute type={E2EAttribute.outline}>
          <svg
            className={cx(classNamesWithTheme[className])}
            style={{
              height: `${height}px`,
              left: `${outlineCoordinates.x1}px`,
              top: `${outlineCoordinates.y1}px`,
              width: `${width}px`,
            }}
          >
            <path
              className={cx(classNamesWithTheme.outline)}
              d={`M ${0},${0} H ${width} V ${height} H ${0} V ${0}`}
              strokeWidth={SW}
              onMouseDown={(event) => onMouseDown(event, '-1')}
            />
          </svg>
        </E2EDataAttribute>
      )}

      {/* RECT INSIDE OUTLINE */}
      {elementsCoordinates.map(({ coordinates: { x1, x2, y1, y2 }, id }) => (
        <E2EDataAttribute key={id} type={E2EAttribute.rect} value={id}>
          <svg
            className={cx(classNamesWithTheme[className])}
            style={{
              height: `${y2 - y1}px`,
              left: `${x1}px`,
              pointerEvents: 'all',
              top: `${y1}px`,
              width: `${x2 - x1}px`,
            }}
          >
            <rect
              fill="none"
              height={y2 - y1}
              onMouseDown={(event) => onMouseDown(event, id)}
              x={0}
              y={0}
              width={x2 - x1}
            />
          </svg>
        </E2EDataAttribute>
      ))}
    </>
  );
};

export default ClickableArea;
