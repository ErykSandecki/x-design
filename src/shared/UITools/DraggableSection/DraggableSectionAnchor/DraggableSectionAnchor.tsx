import cx from 'classnames';
import { FC, useEffect, useState } from 'react';

// components
import Box from '../../../UI/Box/Box';

// others
import { ANCHOR_INDEX } from '../constants';

// styles
import styles from './draggable-section-anchor.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from 'shared/E2EDataAttributes/E2EDataAttribute';

export type TDraggableSectionAnchorProps = {
  e2eValue: TE2EDataAttributeProps['value'];
  index: number;
  isDraggable: boolean;
};

export const DraggableSectionAnchor: FC<TDraggableSectionAnchorProps> = ({ e2eValue, index, isDraggable }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const displayPrompt = isDraggable && showPrompt;

  useEffect(() => {
    if (!isDraggable) {
      setShowPrompt(false);
    }
  }, [isDraggable]);

  return (
    <Box
      attributes={{ [ANCHOR_INDEX]: index }}
      classes={{
        className: cx(styles.DraggableSectionAnchor, {
          [styles['DraggableSectionAnchor--draggable']]: isDraggable,
        }),
      }}
      e2eAttribute={E2EAttribute.anchor}
      e2eValue={e2eValue}
      onMouseEnter={() => isDraggable && setShowPrompt(true)}
      onMouseLeave={() => isDraggable && setShowPrompt(false)}
    >
      {displayPrompt && <Box classes={{ className: cx(styles.DraggableSectionAnchor__prompt) }} />}
    </Box>
  );
};

export default DraggableSectionAnchor;
