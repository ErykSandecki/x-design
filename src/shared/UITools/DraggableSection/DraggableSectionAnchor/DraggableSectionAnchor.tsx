import { FC, useEffect, useState } from 'react';

// components
import Box from '../../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { ANCHOR_INDEX } from '../constants';
import { className, classNames } from './classNames';

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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
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
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.draggable,
          isDraggable,
        ]),
      }}
      e2eAttribute={E2EAttribute.anchor}
      e2eValue={e2eValue}
      onMouseEnter={() => isDraggable && setShowPrompt(true)}
      onMouseLeave={() => isDraggable && setShowPrompt(false)}
    >
      {displayPrompt && <Box classes={{ className: cx(classNamesWithTheme.prompt) }} />}
    </Box>
  );
};

export default DraggableSectionAnchor;
