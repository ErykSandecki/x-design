import { ChangeEvent, useEffect, useState } from 'react';
import { Color } from 'antd/es/color-picker';

// hooks
import { useOnBlurAlphaEvent } from './useOnBlurAlphaEvent';
import { useOnBlurColorEvent } from './useOnBlurColorEvent';
import { useOnChangeAlphaEvent } from './useOnChangeAlphaEvent';
import { useOnChangeColorEvent } from './useOnChangeColorEvent';
import { useOnChangeColorPickerEvent } from './useOnChangeColorPickerEvent';

export type TUseColorPickerEvents = {
  alphaValue: string;
  colorValue: string;
  onBlurAlpha: () => void;
  onBlurColor: () => void;
  onChangeAlpha: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeColorPicker: (value: Color) => void;
};

export const useColorPickerEvents = (
  alpha: string,
  color: string,
  onChangeAlpha: (value: string) => void,
  onChangeColor: (alpha: string, value: string) => void,
): TUseColorPickerEvents => {
  const [alphaValue, setAlphaValue] = useState<string>(alpha);
  const [colorValue, setColorValue] = useState<string>(color.substring(1));

  useEffect(() => {
    setAlphaValue(alpha);
  }, [alpha]);

  useEffect(() => {
    setColorValue(color.substring(1));
  }, [color]);

  return {
    alphaValue,
    colorValue,
    onBlurAlpha: useOnBlurAlphaEvent(
      alpha,
      alphaValue,
      onChangeAlpha,
      setAlphaValue,
    ),
    onBlurColor: useOnBlurColorEvent(
      alpha,
      color,
      colorValue,
      onChangeColor,
      setColorValue,
    ),
    onChangeAlpha: useOnChangeAlphaEvent(setAlphaValue),
    onChangeColor: useOnChangeColorEvent(setColorValue),
    onChangeColorPicker: useOnChangeColorPickerEvent(onChangeColor),
  };
};
