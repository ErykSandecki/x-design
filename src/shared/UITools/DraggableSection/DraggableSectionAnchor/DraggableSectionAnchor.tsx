import cx from 'classnames';
import { FC, useEffect, useState } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from 'shared/E2EDataAttributes/E2EDataAttribute';

// others
import { ANCHOR_INDEX } from '../constants';

// styles
import styles from './draggable-section-anchor.scss';

// types
import { E2EAttribute } from 'types';

// utils
import { mapAttributes } from 'utils';

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
    <E2EDataAttribute type={E2EAttribute.anchor} value={e2eValue}>
      <div
        className={cx(styles.DraggableSectionAnchor, {
          [styles['DraggableSectionAnchor--draggable']]: isDraggable,
        })}
        onMouseEnter={() => isDraggable && setShowPrompt(true)}
        onMouseLeave={() => isDraggable && setShowPrompt(false)}
        {...mapAttributes({ [ANCHOR_INDEX]: index })}
      >
        {displayPrompt && <div className={cx(styles.DraggableSectionAnchor__prompt)} />}
      </div>
    </E2EDataAttribute>
  );
};

export default DraggableSectionAnchor;
