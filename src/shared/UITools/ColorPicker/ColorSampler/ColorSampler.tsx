import cx from 'classnames';
import { createPortal } from 'react-dom';
import { FC } from 'react';

// components
import ColorGrid from './ColorGrid/ColorGrid';
import ColorGridMask from './ColorGridMask/ColorGridMask';
import ColorPrompt from './ColorPrompt/ColorPrompt';
import ColorResult from './ColorResult/ColorResult';

// hooks
import { useColorSamplerEvents } from './hooks/useColorSamplerEvents';

// others
import { BOX_OFFSET, MIDDLE_ARRAY } from './constants';

// styles
import styles from './color-sampler.module.scss';

export type TColorSamplerProps = {
  initialMousePosition: T2DCoordinates;
  onClickColorSampler: TFunc<[string]>;
};

export const ColorSampler: FC<TColorSamplerProps> = ({ initialMousePosition, onClickColorSampler }) => {
  const { colors, isPending, mousePosition } = useColorSamplerEvents(initialMousePosition);
  const showResult = !!colors[MIDDLE_ARRAY];

  return createPortal(
    <div
      className={cx(styles.ColorSampler)}
      style={{
        left: `${mousePosition.x + BOX_OFFSET}px`,
        top: `${mousePosition.y + BOX_OFFSET}px`,
      }}
    >
      <ColorGridMask colors={colors} onClickColorSampler={onClickColorSampler} />
      <ColorGrid colors={colors} isPending={isPending} />
      {showResult && (
        <div>
          <ColorResult colors={colors} />
          <ColorPrompt />
        </div>
      )}
    </div>,
    document.body,
  );
};

export default ColorSampler;
