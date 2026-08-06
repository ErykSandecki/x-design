import cx from 'classnames';
import { FC } from 'react';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { cssVariables } from 'constant/cssVariables';
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
        zIndex: getCssVariable(cssVariables.XD_PAGE_BUILDER_ZINDEX_OVERLAY_CONTAINER),
      }}
    />
  );
};

export default OverlayContainer;
