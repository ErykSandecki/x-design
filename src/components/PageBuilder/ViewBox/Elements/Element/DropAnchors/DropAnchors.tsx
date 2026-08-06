import cx from 'classnames';
import { FC } from 'react';

// components
import Anchors from './Anchors/Anchors';
import Prompts from './Prompts/Prompts';

// hooks
import { useDropAnchorsEvents } from './hooks/useDropAnchorsEvents';

// styles
import styles from './drop-anchors.scss';

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
    <div className={cx(styles.DropAnchors)}>
      <Prompts
        anchorPos={anchorPos}
        displayNextPrompt={displayNextPrompt}
        displayPrevPrompt={displayPrevPrompt}
        isFlowVertical={isFlowVertical}
        isGrid={isGrid}
      />
      <Anchors isFlowVertical={isFlowVertical} isGrid={isGrid} {...events} />
    </div>
  );
};

export default DropAnchors;
