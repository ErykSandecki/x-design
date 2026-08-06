import cx from 'classnames';
import { createPortal } from 'react-dom';
import { FC } from 'react';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others

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

  return (
    overlayContainerRef.current &&
    createPortal(
      <div
        className={cx(styles.Outline)}
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
