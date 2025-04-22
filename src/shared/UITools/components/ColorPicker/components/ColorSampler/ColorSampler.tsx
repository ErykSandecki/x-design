import { createPortal } from 'react-dom';
import { FC } from 'react';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

// components
import Box from '../../../../../UI/components/Box/Box';
import Icon from '../../../../../UI/components/Icon/Icon';
import { Small } from '../../../../../UI/components/Typography';

// hooks
import { useColorSamplerEvents } from './hooks/useColorSamplerEvents';
import { useTheme } from 'hooks';

// others
import { BOX_OFFSET, MIDDLE_ARRAY, translationNameSpace } from './constants';
import { className, classNames } from './classNames';

// styles
import styles from './color-sampler.scss';

// types
import { T2DCoordinates } from 'types';

// utils
import { rgbToHex } from 'utils';

export type TColorSamplerProps = {
  initialMousePosition: T2DCoordinates;
  onClickColorSampler: (color: string) => void;
};

export const ColorSampler: FC<TColorSamplerProps> = ({
  initialMousePosition,
  onClickColorSampler,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();
  const { colors, isPending, mousePosition } =
    useColorSamplerEvents(initialMousePosition);
  const { r, g, b, a } = colors[MIDDLE_ARRAY] || {};

  return createPortal(
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      style={{
        left: `${mousePosition.x + BOX_OFFSET}px`,
        top: `${mousePosition.y + BOX_OFFSET}px`,
      }}
      sx={{ bg: 'neutral5' }}
    >
      <div
        className={cx(classNamesWithTheme.preventAntdEventMask)}
        onClick={() => onClickColorSampler(rgbToHex(r, g, b))}
      />
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
      {colors[MIDDLE_ARRAY] && (
        <div className={cx(classNamesWithTheme.data)}>
          <div className={cx(classNamesWithTheme.header)}>
            <div
              className={cx(classNamesWithTheme.selectedColor)}
              style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
            />
            <Small>{rgbToHex(r, g, b)}</Small>
          </div>
          <div className={cx(classNamesWithTheme.prompt)}>
            <Icon height={12} name="EyesDropper" width={12} />
            <Small
              classes={{ className: cx(classNamesWithTheme.promptDescription) }}
              sx={{ cl: 'neutral2' }}
            >
              {t(`${translationNameSpace}.prompt`)}
            </Small>
          </div>
        </div>
      )}
    </Box>,
    document.body,
  );
};

export default ColorSampler;
