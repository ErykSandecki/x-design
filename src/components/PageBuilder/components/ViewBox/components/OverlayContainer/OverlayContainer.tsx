import { FC } from 'react';

// components
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { cssVariables } from 'constant/cssVariables';
import { OVERLAY_CONTAINER_ID } from '../../constants';

// styles
import styles from './overlay-container.scss';

// utils
import { getCssVariable } from 'utils';

const OverlayContainer: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { overlayContainerRef } = useRefs();

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      id={OVERLAY_CONTAINER_ID}
      ref={overlayContainerRef}
      style={{
        zIndex: getCssVariable(
          cssVariables.XD_PAGE_BUILDER_ZINDEX_OVERLAY_CONTAINER,
        ),
      }}
    />
  );
};

export default OverlayContainer;
