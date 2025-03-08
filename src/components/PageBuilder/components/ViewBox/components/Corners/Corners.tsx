import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

import { HHW, RX, SHW, SW } from './constants';

// styles
import styles from './corners.scss';

// types
import { TRectCoordinates } from 'types';

export type TCornersProps = {
  clickable?: boolean;
  rectCoordinates: TRectCoordinates;
  withOutline?: boolean;
};

const Corners: FC<TCornersProps> = ({
  clickable,
  rectCoordinates,
  withOutline = false,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, x2, y1, y2 } = rectCoordinates || {};

  return (
    <svg
      className={cx(classNamesWithTheme[className].name, [
        classNamesWithTheme[className].modificators.clickable,
        clickable,
      ])}
    >
      {withOutline && (
        <path
          className={cx(classNamesWithTheme.outline.name, [
            classNamesWithTheme.outline.modificators.clickable,
            clickable,
          ])}
          onMouseDown={(event) => event.stopPropagation()}
          d={`M ${x1},${y1} H ${x2} V ${y2} H ${x1} V ${y1}`}
          strokeWidth={SW}
        />
      )}
      <rect x={x1 - HHW} y={y1 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={x1 - HHW} y={y2 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={x2 - HHW} y={y1 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={x2 - HHW} y={y2 - HHW} width={SHW} height={SHW} rx={RX} />
    </svg>
  );
};

export default Corners;
