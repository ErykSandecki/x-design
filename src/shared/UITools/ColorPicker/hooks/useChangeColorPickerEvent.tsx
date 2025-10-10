import { Color } from 'antd/es/color-picker';

export type TUseChangeColorPickerEvent = TFunc<[Color]>;

export const useChangeColorPickerEvent = (onChange: TFunc<[string, string]>): TUseChangeColorPickerEvent => {
  const handleChange = (value: Color): void => {
    const alpha = (value.toRgb().a * 100).toFixed(0).toString();
    onChange(alpha, `#${value.toHex().slice(0, 6)}`);
  };

  return handleChange;
};
