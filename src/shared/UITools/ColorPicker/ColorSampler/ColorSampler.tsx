import { createPortal } from 'react-dom';
import { FC } from 'react';

// components
import Box from '../../../UI/Box/Box';
import ColorGrid from './ColorGrid/ColorGrid';
import ColorGridMask from './ColorGridMask/ColorGridMask';
import ColorPrompt from './ColorPrompt/ColorPrompt';
import ColorResult from './ColorResult/ColorResult';

// hooks
import { useColorSamplerEvents } from './hooks/useColorSamplerEvents';
import { useTheme } from 'hooks';

// others
import { BOX_OFFSET, MIDDLE_ARRAY } from './constants';
import { className, classNames } from './classNames';

// styles
import styles from './color-sampler.scss';

export type TColorSamplerProps = {
  initialMousePosition: T2DCoordinates;
  onClickColorSampler: TFunc<[string]>;
};

export const ColorSampler: FC<TColorSamplerProps> = ({ initialMousePosition, onClickColorSampler }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { colors, isPending, mousePosition } = useColorSamplerEvents(initialMousePosition);
  const showResult = !!colors[MIDDLE_ARRAY];

  return createPortal(
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      style={{
        left: `${mousePosition.x + BOX_OFFSET}px`,
        top: `${mousePosition.y + BOX_OFFSET}px`,
      }}
      sx={{ bg: 'neutral5' }}
    >
      <ColorGridMask colors={colors} onClickColorSampler={onClickColorSampler} />
      <ColorGrid colors={colors} isPending={isPending} />
      {showResult && (
        <Box>
          <ColorResult colors={colors} />
          <ColorPrompt />
        </Box>
      )}
    </Box>,
    document.body,
  );
};

export default ColorSampler;
