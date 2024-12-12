import { MouseEvent, MutableRefObject, useMemo } from 'react';

// hooks
import { useResizeHandler } from 'hooks/useResizeHandler/useResizeHandler';
import { useWindowSize } from 'hooks/useWindowSize/useWindowSize';

// others
import { PANEL_PROPERTIES_WIDTH } from '../components/PanelProperties/constants';

export type TUserResizePanels = {
  isPressingX: boolean;
  onMouseDownX: (event: MouseEvent<HTMLElement>, isInverted: boolean) => void;
  width1: number;
  width2: number;
};

export const useResizePanels = (
  blocksPanelRef: MutableRefObject<HTMLDivElement>,
): TUserResizePanels => {
  const { innerWidth } = useWindowSize();
  const {
    isPressingX,
    onMouseDownX,
    width: width1,
  } = useResizeHandler(0, 250, 0, 500, 0, 100, blocksPanelRef);

  return useMemo(
    () => ({
      isPressingX,
      onMouseDownX,
      width1,
      width2: innerWidth - (width1 + PANEL_PROPERTIES_WIDTH),
    }),
    [innerWidth, isPressingX, width1],
  );
};
