import cx from 'classnames';
import { FC } from 'react';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { OVERLAY_CONTAINER_ID } from '../../constants';

// styles
import styles from './overlay-container.scss';

// utils
import { getCssVariable } from 'utils';

const OverlayContainer: FC = () => {
  const { overlayContainerRef } = useRefs();

  return (
    <div
      className={cx(styles.OverlayContainer)}
      id={OVERLAY_CONTAINER_ID}
      ref={overlayContainerRef}
      style={{
        zIndex: getCssVariable('--xd-page-builder-zindex-overlay-container'),
      }}
    />
  );
};

export default OverlayContainer;
