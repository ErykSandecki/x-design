import { createPortal } from 'react-dom';
import { FC } from 'react';
import { Spin } from 'antd';

// components
import Box from 'shared/UI/components/Box/Box';

// hooks
import { useColorSamplerEvents } from './hooks/useColorSamplerEvents';
import { useTheme } from 'hooks';

// others
import { BOX_OFFSET } from './constants';
import { className, classNames } from './classNames';

// styles
import styles from './color-sampler.scss';

// types
import { T2DCoordinates } from 'types';

export type TColorSamplerProps = {
  active: boolean;
  initialMousePosition: T2DCoordinates;
};

export const ColorSampler: FC<TColorSamplerProps> = ({
  active,
  initialMousePosition,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { colors, isPending, mousePosition } = useColorSamplerEvents(
    active,
    initialMousePosition,
  );

  if (!active) {
    return null;
  }

  return createPortal(
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      style={{
        left: `${mousePosition.x + BOX_OFFSET}px`,
        top: `${mousePosition.y + BOX_OFFSET}px`,
      }}
      sx={{ bg: 'neutral5' }}
    >
      <div className={cx(classNamesWithTheme.clickableMask)} />
      <div className={cx(classNamesWithTheme.pickerWrapper)}>
        <div className={cx(classNamesWithTheme.picker)}>
          {colors.map(({ a, b, g, r }, index) => (
            <div
              className={cx(classNamesWithTheme.pickerGrid)}
              key={index}
              style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
            />
          ))}
        </div>
        <div className={cx(classNamesWithTheme.pickerTargetColor)} />
        {isPending && (
          <div className={cx(classNamesWithTheme.pickerLoader)}>
            <Spin />
          </div>
        )}
      </div>
    </Box>,
    document.body,
  );
};
