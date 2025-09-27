import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Color } from 'antd/es/color-picker';
import { debounce } from 'lodash';

// hooks
import { useBlurAlphaEvent } from './useBlurAlphaEvent';
import { useBlurColorEvent } from './useBlurColorEvent';
import { useChangeAlphaEvent } from './useChangeAlphaEvent';
import { useChangeColorEvent } from './useChangeColorEvent';
import { useChangeColorPickerEvent } from './useChangeColorPickerEvent';

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

  const updateStates = useCallback(
    debounce((alpha: string, color: string) => {
      setAlphaValue(alpha);
      setColorValue(color.substring(1));
    }),
    [],
  );

  useEffect(() => {
    updateStates(alpha, color);
  }, [alpha, color]);

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
