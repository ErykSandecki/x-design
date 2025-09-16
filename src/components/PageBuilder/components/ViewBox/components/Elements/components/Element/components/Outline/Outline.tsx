import { createPortal } from 'react-dom';
import { FC, memo } from 'react';

// components
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './outline.scss';

// types
import { TElement } from 'types';

type TOutlineProps = {
  height: TElement['height'];
  rotate: TElement['rotate'];
  width: TElement['width'];
  x: TElement['coordinates']['x'];
  y: TElement['coordinates']['y'];
};

const Outline: FC<TOutlineProps> = ({ height, rotate, width, x, y }) => {
  const { overlayContainerRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return createPortal(
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      style={{
        height,
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotate}deg)`,
        width,
      }}
    />,
    overlayContainerRef.current,
  );
};

export default memo(Outline);
