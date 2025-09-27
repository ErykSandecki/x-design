import { ChangeEvent, useState } from 'react';
import { Color } from 'antd/es/color-picker';

// hooks
import { useBlurAlphaEvent } from './useBlurAlphaEvent';
import { useBlurColorEvent } from './useBlurColorEvent';
import { useChangeAlphaEvent } from './useChangeAlphaEvent';
import { useChangeColorEvent } from './useChangeColorEvent';
import { useChangeColorPickerEvent } from './useChangeColorPickerEvent';
import { useHandleUpdateColorStates } from './useHandleUpdateColorStates';

export type TUseColorPickerEvents = {
  alphaValue: string;
  colorValue: string;
  onBlurAlpha: TFunc;
  onBlurColor: TFunc;
  onChangeAlpha: TFunc<[ChangeEvent<HTMLInputElement>]>;
  onChangeColor: TFunc<[ChangeEvent<HTMLInputElement>]>;
  onChangeColorPicker: TFunc<[Color]>;
};

export const useColorPickerEvents = (
  alpha: string,
  color: string,
  onChangeAlpha: TFunc<[string]>,
  onChangeColor: TFunc<[string, string]>,
): TUseColorPickerEvents => {
  const [alphaValue, setAlphaValue] = useState<string>(alpha);
  const [colorValue, setColorValue] = useState<string>(color.substring(1));

  useHandleUpdateColorStates(alpha, color, setAlphaValue, setColorValue);

  return {
    alphaValue,
    colorValue,
    onBlurAlpha: useBlurAlphaEvent(alpha, alphaValue, onChangeAlpha, setAlphaValue),
    onBlurColor: useBlurColorEvent(alpha, color, colorValue, onChangeColor, setColorValue),
    onChangeAlpha: useChangeAlphaEvent(setAlphaValue),
    onChangeColor: useChangeColorEvent(setColorValue),
    onChangeColorPicker: useChangeColorPickerEvent(onChangeColor),
  };
};
