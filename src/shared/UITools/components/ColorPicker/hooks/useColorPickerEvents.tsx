import { ChangeEvent, useState } from 'react';
import { Color } from 'antd/es/color-picker';

// hooks
import { useOnBlurColorEvent } from './useOnBlurColorEvent';
import { useOnChangeColorEvent } from './useOnChangeColorEvent';
import { useOnChangeColorPickerEvent } from './useOnChangeColorPickerEvent';

export type TUseColorPickerEvents = {
  colorValue: string;
  onBlurColor: () => void;
  onChangeColor: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeColorPicker: (value: Color) => void;
};

export const useColorPickerEvents = (
  currentValue: string,
  onChange: (value: string) => void,
): TUseColorPickerEvents => {
  const [colorValue, setColorValue] = useState<string>(
    currentValue.substring(1),
  );

  return {
    colorValue,
    onBlurColor: useOnBlurColorEvent(currentValue, setColorValue),
    onChangeColor: useOnChangeColorEvent(onChange, setColorValue),
    onChangeColorPicker: useOnChangeColorPickerEvent(onChange),
  };
};
