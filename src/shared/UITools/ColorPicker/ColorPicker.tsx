import cx from 'classnames';
import { ColorPickerProps } from 'antd';
import { FC, useState } from 'react';

// components
import ColorPickerInputAlpha from './ColorPickerInputAlpha';
import ColorPickerInputColor from './ColorPickerInputColor';
import FieldGroup from '../FieldGroup/FieldGroup';
import { TPanelProps } from './Panel/Panel';

// hooks
import { useColorPickerEvents } from './hooks/useColorPickerEvents';

// others

// styles
import styles from './color-picker.module.scss';

// types
import { TColor } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../UI/types';

export type TColorPickerProps = Pick<TPanelProps, 'activeSampler' | 'onClickColorSampler' | 'onClickSampler'> &
  TUIProps<{ className: string }> &
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
  const [visible, setVisible] = useState(false);

  const { alphaValue, colorValue, onBlurAlpha, onBlurColor, onChangeAlpha, onChangeColor, onChangeColorPicker } =
    useColorPickerEvents(alpha, color, onChangeAlphaHandler, onChangeColorHandler);

  return (
    <FieldGroup attributes={{ ['data-visible-color-picker-panel']: visible ? 'true' : 'false' }} e2eValue={e2eValue}>
      <ColorPickerInputColor
        activeSampler={activeSampler}
        alpha={alpha}
        alphaValue={alphaValue}
        className={cx(styles['ColorPicker__color-input'])}
        classNameParent={cx(styles.ColorPicker)}
        color={color}
        colorValue={colorValue}
        e2eValue={e2eValue}
        onBlur={onBlurColor}
        onChangeColor={onChangeColor}
        onChangeColorPicker={onChangeColorPicker}
        onClickColorSampler={onClickColorSampler}
        onClickSampler={onClickSampler}
        setVisible={setVisible}
        visible={visible}
        {...restProps}
      />
      <ColorPickerInputAlpha
        alpha={alpha}
        alphaValue={alphaValue}
        className={cx(styles['ColorPicker__alpha-input'])}
        classNameInputUnit={cx(styles['ColorPicker__alpha-input-unit'])}
        onBlur={onBlurAlpha}
        onChangeAlpha={onChangeAlpha}
        onChangeAlphaHandler={onChangeAlphaHandler}
      />
    </FieldGroup>
  );
};

export default ColorPicker;
