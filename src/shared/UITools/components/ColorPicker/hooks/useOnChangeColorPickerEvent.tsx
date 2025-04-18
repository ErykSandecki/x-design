import { Color } from 'antd/es/color-picker';

export type TUseOnChangeColorPickerEvent = (value: Color) => void;

export const useOnChangeColorPickerEvent = (
  onChange: (value: string) => void,
): TUseOnChangeColorPickerEvent => {
  const handleChange = (value: Color) => {
    onChange(`#${value.toHex()}`);
  };

  return handleChange;
};
