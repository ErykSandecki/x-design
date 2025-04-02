import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

import { HHW, RX, SHW } from './constants';

// styles
import styles from './corners.scss';

// types
import { TRectCoordinates } from 'types';

export type TCornersProps = {
  increaseZIndex?: boolean;
  rectCoordinates: TRectCoordinates;
};

const Corners: FC<TCornersProps> = ({
  increaseZIndex = false,
  rectCoordinates,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, x2, y1, y2 } = rectCoordinates || {};
  const height = y2 - y1;
  const width = x2 - x1;

  return (
    <svg
      className={cx(classNamesWithTheme[className].name, [
        classNamesWithTheme[className].modificators.increaseZIndex,
        increaseZIndex,
      ])}
      style={{
        height: `${height}px`,
        left: `${x1}px`,
        top: `${y1}px`,
        width: `${width}px`,
      }}
    >
      <circle cx={width / 2} cy={0} r={HHW} />
      <rect x={0 - HHW} y={0 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={0 - HHW} y={height - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={width - HHW} y={0 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={width - HHW} y={height - HHW} width={SHW} height={SHW} rx={RX} />
    </svg>
  );
};

export default Corners;
