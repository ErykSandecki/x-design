import { FC } from 'react';

// components
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { cssVariables } from 'constant/cssVariables';
import { OVERLAY_CONTAINER_ID } from '../../constants';

// utils
import { getCssVariable } from 'utils';

const OverlayContainer: FC = () => {
  const { overlayContainerRef } = useRefs();

  return (
    <Box
      id={OVERLAY_CONTAINER_ID}
      ref={overlayContainerRef}
      sx={{ left: 0, position: 'absolute', top: 0 }}
      style={{
        zIndex: getCssVariable(
          cssVariables.XD_PAGE_BUILDER_ZINDEX_OVERLAY_CONTAINER,
        ),
      }}
    />
  );
};

export default OverlayContainer;
