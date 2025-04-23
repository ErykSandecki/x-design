import { ColorPicker as ColorPickerAntd, ColorPickerProps } from 'antd';
import { FC, useRef, useState } from 'react';

// components
import Color from '../Color/Color';
import FieldGroup from '../FieldGroup/FieldGroup';
import Panel, { TPanelProps } from './components/Panel/Panel';
import ScrubbableInput from '../../../ScrubbableInput/ScrubbableInput';
import TextField from '../TextField/TextField';

// hooks
import { useColorPickerEvents } from './hooks/useColorPickerEvents';
import { useTheme } from 'hooks';

// others
import { classes, className, classNames } from './classNames';

// styles
import styles from './color-picker.scss';

// types
import { E2EAttribute, KeyboardKeys, TColor } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../../UI/types';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';
import { handleSubmitInput, hexToRgb } from 'utils';

export type TColorPickerProps = Pick<
  TPanelProps,
  'activeSampler' | 'onClickColorSampler' | 'onClickSampler'
> &
  TUIProps<typeof classes> &
  Omit<ColorPickerProps, 'arrow' | 'onOpenChange' | 'open' | 'panelRender'> & {
    alpha: TColor['alpha'];
    color: string;
    e2eValue?: TE2EDataAttributeProps['value'];
    onChangeAlpha: (value: string) => void;
    onChangeColor: (alpha: string, value: string) => void;
  };

export const ColorPicker: FC<TColorPickerProps> = ({
  activeSampler,
  alpha,
  classes = { className: '' },
  color,
  e2eValue = '',
  onChangeAlpha: onChangeAlphaHandler,
  onChangeColor: onChangeColorHandler,
  onClickColorSampler,
  onClickSampler,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const {
    alphaValue,
    colorValue,
    onBlurAlpha,
    onBlurColor,
    onChangeAlpha,
    onChangeColor,
    onChangeColorPicker,
  } = useColorPickerEvents(
    alpha,
    color,
    onChangeAlphaHandler,
    onChangeColorHandler,
  );
  const inputAlpha = useRef(null);
  const inputColor = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <FieldGroup>
      <TextField
        className={cx(classNamesWithTheme.hexInput)}
        e2eValue="color"
        onBlur={onBlurColor}
        onChange={onChangeColor}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, inputColor.current)(event)
        }
        ref={inputColor}
        startAdornment={
          <ColorPickerAntd
            arrow={false}
            className={cx(classes.className, classNamesWithTheme[className])}
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
            <div>
              <Color alpha={alpha} color={color} />
            </div>
          </ColorPickerAntd>
        }
        value={colorValue.replace('#', '')}
      />
      <TextField
        className={cx(classNamesWithTheme.alphaInput)}
        e2eValue="alpha"
        endAdorment={
          <ScrubbableInput
            max={100}
            min={0}
            onChange={(value) => onChangeAlphaHandler(value.toString())}
            value={parseInt(alphaValue)}
          >
            %
          </ScrubbableInput>
        }
        max={100}
        min={0}
        onBlur={onBlurAlpha}
        onChange={onChangeAlpha}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, inputAlpha.current)(event)
        }
        ref={inputAlpha}
        type="number"
        value={alphaValue}
      />
    </FieldGroup>
  );
};

export default ColorPicker;
