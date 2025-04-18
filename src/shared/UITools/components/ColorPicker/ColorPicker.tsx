import { ColorPicker as ColorPickerAntd, ColorPickerProps } from 'antd';
import { FC, useState } from 'react';

// components
import FieldGroup from '../FieldGroup/FieldGroup';
import Panel from './components/Panel/Panel';
import TextField from '../TextField/TextField';

// hooks
import { useColorPickerEvents } from './hooks/useColorPickerEvents';
import { useTheme } from 'hooks';

// others
import { classes, className, classNames } from './classNames';

// styles
import styles from './color-picker.scss';

// types
import { E2EAttribute, TBackground } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../../UI/types';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';
import { hexToRgb } from 'utils';

export type TColorPickerProps = TUIProps<typeof classes> &
  Omit<ColorPickerProps, 'arrow' | 'onOpenChange' | 'open' | 'panelRender'> & {
    alpha: TBackground['alpha'];
    color: string;
    e2eValue?: TE2EDataAttributeProps['value'];
    onChangeAlpha: (value: string) => void;
    onChangeColor: (alpha: string, value: string) => void;
  };

export const ColorPicker: FC<TColorPickerProps> = ({
  alpha,
  classes = { className: '' },
  color,
  e2eValue = '',
  onChangeAlpha: onChangeAlphaHandler,
  onChangeColor: onChangeColorHandler,
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
  const [visible, setVisible] = useState(false);

  return (
    <FieldGroup>
      <TextField
        className={cx(classNamesWithTheme.hexInput)}
        onBlur={onBlurColor}
        onChange={onChangeColor}
        startAdornment={
          <ColorPickerAntd
            arrow={false}
            className={cx(classes.className, classNamesWithTheme[className])}
            onChange={onChangeColorPicker}
            onOpenChange={(visible) => setVisible(visible)}
            open={visible}
            panelRender={(children) => (
              <Panel setVisible={setVisible}>{children}</Panel>
            )}
            value={hexToRgb(colorValue, parseInt(alphaValue))}
            {...getAttributes(E2EAttribute.colorPicker, e2eValue)}
            {...restProps}
          >
            <div
              className={cx(classNamesWithTheme.picker)}
              style={{ backgroundColor: color }}
            />
          </ColorPickerAntd>
        }
        value={colorValue.replace('#', '')}
      />
      <TextField
        endAdorment={'%'}
        max={100}
        min={0}
        onBlur={onBlurAlpha}
        onChange={onChangeAlpha}
        type="number"
        value={alphaValue}
      />
    </FieldGroup>
  );
};

export default ColorPicker;
