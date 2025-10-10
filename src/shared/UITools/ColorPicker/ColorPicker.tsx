import { ColorPickerProps } from 'antd';
import { FC } from 'react';

// components
import ColorPickerInputAlpha from './ColorPickerInputAlpha';
import ColorPickerInputColor from './ColorPickerInputColor';
import FieldGroup from '../FieldGroup/FieldGroup';
import { TPanelProps } from './components/Panel/Panel';

// hooks
import { useColorPickerEvents } from './hooks/useColorPickerEvents';
import { useTheme } from 'hooks';

// others
import { classes, className, classNames } from './classNames';

// styles
import styles from './color-picker.scss';

// types
import { TColor } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../UI/types';

export type TColorPickerProps = Pick<TPanelProps, 'activeSampler' | 'onClickColorSampler' | 'onClickSampler'> &
  TUIProps<typeof classes> &
  Omit<ColorPickerProps, 'arrow' | 'onOpenChange' | 'open' | 'panelRender'> & {
    alpha: TColor['alpha'];
    color: string;
    e2eValue?: TE2EDataAttributeProps['value'];
    onChangeAlpha: TFunc<[string]>;
    onChangeColor: TFunc<[string, string]>;
  };

export const ColorPicker: FC<TColorPickerProps> = ({
  activeSampler,
  alpha,
  color,
  e2eValue = '',
  onChangeAlpha: onChangeAlphaHandler,
  onChangeColor: onChangeColorHandler,
  onClickColorSampler,
  onClickSampler,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const { alphaValue, colorValue, onBlurAlpha, onBlurColor, onChangeAlpha, onChangeColor, onChangeColorPicker } =
    useColorPickerEvents(alpha, color, onChangeAlphaHandler, onChangeColorHandler);

  return (
    <FieldGroup>
      <ColorPickerInputColor
        activeSampler={activeSampler}
        alpha={alpha}
        alphaValue={alphaValue}
        className={cx(classNamesWithTheme.colorInput)}
        classNameParent={cx(classNamesWithTheme[className])}
        color={color}
        colorValue={colorValue}
        e2eValue={e2eValue}
        onBlur={onBlurColor}
        onChangeColor={onChangeColor}
        onChangeColorPicker={onChangeColorPicker}
        onClickColorSampler={onClickColorSampler}
        onClickSampler={onClickSampler}
        {...restProps}
      />
      <ColorPickerInputAlpha
        alpha={alpha}
        alphaValue={alphaValue}
        className={cx(classNamesWithTheme.alphaInput)}
        classNameInputUnit={cx(classNamesWithTheme.alphaInputUnit)}
        onBlur={onBlurAlpha}
        onChangeAlpha={onChangeAlpha}
        onChangeAlphaHandler={onChangeAlphaHandler}
      />
    </FieldGroup>
  );
};

export default ColorPicker;
