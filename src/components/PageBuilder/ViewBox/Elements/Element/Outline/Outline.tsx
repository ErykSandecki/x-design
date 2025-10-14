import { createPortal } from 'react-dom';
import { FC } from 'react';

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
  angle: TElement['angle'];
  height: TElement['height']['value'];
  width: TElement['width']['value'];
  x: TElement['coordinates']['x'];
  y: TElement['coordinates']['y'];
};

const Outline: FC<TOutlineProps> = ({ angle, height, width, x, y }) => {
  const { overlayContainerRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    overlayContainerRef.current &&
    createPortal(
      <Box
        classes={{ className: cx(classNamesWithTheme[className]) }}
        style={{
          height,
          left: `${x}px`,
          top: `${y}px`,
          transform: `rotate(${angle}deg)`,
          width,
        }}
      />,
      overlayContainerRef.current,
    )
  );
};

export default Outline;
