import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

import { BORDER, HHW, RX, SHW } from './constants';

// styles
import styles from './corners.scss';

// types

export type TCornersProps = {
  rectCoordinates: TRectCoordinates;
  showTopButton?: boolean;
};

const Corners: FC<TCornersProps> = ({ rectCoordinates }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, x2, y1, y2 } = rectCoordinates;
  const height = y2 - y1;
  const width = x2 - x1;

  return (
    <svg
      className={cx(classNamesWithTheme[className].name)}
      style={{
        height: `${height}px`,
        left: `${x1}px`,
        top: `${y1}px`,
        width: `${width}px`,
      }}
    >
      <rect x={0 - HHW} y={0 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={0 - HHW} y={height - HHW - BORDER} width={SHW} height={SHW} rx={RX} />
      <rect x={width - HHW - BORDER} y={0 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={width - HHW - BORDER} y={height - HHW - BORDER} width={SHW} height={SHW} rx={RX} />
    </svg>
  );
};

export default Corners;
