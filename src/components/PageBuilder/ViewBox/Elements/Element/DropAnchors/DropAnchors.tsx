import { FC } from 'react';

// components
import Anchors from './Anchors/Anchors';
import Prompts from './Prompts/Prompts';
import { Box } from 'shared';

// hooks
import { useDropAnchorsEvents } from './hooks/useDropAnchorsEvents';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';

export type TDropAnchorsProps = {
  id: TElement['id'];
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const DropAnchors: FC<TDropAnchorsProps> = ({ id, index, mouseMode, parentId }) => {
  const { anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid, ...events } = useDropAnchorsEvents(
    id,
    index,
    mouseMode,
    parentId,
  );

  return (
    <Box
      sx={{
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    >
      <Prompts
        anchorPos={anchorPos}
        displayNextPrompt={displayNextPrompt}
        displayPrevPrompt={displayPrevPrompt}
        isFlowVertical={isFlowVertical}
        isGrid={isGrid}
      />
      <Anchors isFlowVertical={isFlowVertical} isGrid={isGrid} {...events} />
    </Box>
  );
};

export default DropAnchors;
