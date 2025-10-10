import cx from 'classnames';
import { ColorPicker as ColorPickerAntd, ColorPickerProps } from 'antd';
import { FC, useRef, useState } from 'react';

// components
import Box from '../../UI/Box/Box';
import Color from '../Color/Color';
import Panel, { TPanelProps } from './components/Panel/Panel';
import TextField from '../TextField/TextField';

// others
import { classes } from './classNames';

// types
import { E2EAttribute, KeyboardKeys, TColor } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../UI/types';
import { TUseColorPickerEvents } from './hooks/useColorPickerEvents';

// utils
import { getAttributes } from '../../E2EDataAttributes/utils';
import { handleSubmitInput, hexToRgb } from 'utils';

export type TColorPickerInputColorProps = Pick<
  TPanelProps,
  'activeSampler' | 'onClickColorSampler' | 'onClickSampler'
> &
  TUIProps<typeof classes> &
  Omit<ColorPickerProps, 'arrow' | 'onOpenChange' | 'open' | 'panelRender'> & {
    alpha: TColor['alpha'];
    alphaValue: TUseColorPickerEvents['alphaValue'];
    className: string;
    classNameParent: string;
    color: string;
    colorValue: TUseColorPickerEvents['colorValue'];
    e2eValue?: TE2EDataAttributeProps['value'];
    onBlur: TUseColorPickerEvents['onBlurColor'];
    onChangeColor: TUseColorPickerEvents['onChangeColor'];
    onChangeColorPicker: TUseColorPickerEvents['onChangeColorPicker'];
  };

export const ColorPickerInputColor: FC<TColorPickerInputColorProps> = ({
  activeSampler,
  alpha,
  alphaValue,
  className,
  classNameParent,
  color,
  colorValue,
  e2eValue,
  onBlur,
  onChangeColor,
  onChangeColorPicker,
  onClickColorSampler,
  onClickSampler,
  ...restProps
}) => {
  const inputColor = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      className={className}
      e2eValue="color"
      onBlur={onBlur}
      onChange={onChangeColor}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, inputColor.current)(event)}
      ref={inputColor}
      startAdornment={
        <ColorPickerAntd
          arrow={false}
          className={cx(classes.className, classNameParent)}
          onChange={onChangeColorPicker}
          onOpenChange={(visible) => setVisible(visible)}
          open={visible}
          panelRender={(children) => (
            <Panel
              activeSampler={activeSampler}
              onClickColorSampler={onClickColorSampler}
              onClickSampler={onClickSampler}
              setVisible={setVisible}
            >
              {children}
            </Panel>
          )}
          value={hexToRgb(colorValue, parseInt(alphaValue))}
          {...getAttributes(E2EAttribute.colorPicker, e2eValue)}
          {...restProps}
        >
          <Box>
            <Color alpha={alpha} color={color} />
          </Box>
        </ColorPickerAntd>
      }
      value={colorValue.replace('#', '')}
    />
  );
};

export default ColorPickerInputColor;
