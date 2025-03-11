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

  return (
    <svg
      className={cx(classNamesWithTheme[className].name, [
        classNamesWithTheme[className].modificators.increaseZIndex,
        increaseZIndex,
      ])}
    >
      <rect x={x1 - HHW} y={y1 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={x1 - HHW} y={y2 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={x2 - HHW} y={y1 - HHW} width={SHW} height={SHW} rx={RX} />
      <rect x={x2 - HHW} y={y2 - HHW} width={SHW} height={SHW} rx={RX} />
    </svg>
  );
};

export default Corners;
