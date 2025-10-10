import { FC, useRef } from 'react';

// components
import ScrubbableInput from '../../ScrubbableInput/ScrubbableInput';
import TextField from '../TextField/TextField';

// types
import { KeyboardKeys, TColor } from 'types';
import { TUseColorPickerEvents } from './hooks/useColorPickerEvents';

// utils
import { handleSubmitInput } from 'utils';

export type TColorPickerInputAlphaProps = {
  alpha: TColor['alpha'];
  alphaValue: TUseColorPickerEvents['alphaValue'];
  className: string;
  classNameInputUnit: string;
  onBlur: TUseColorPickerEvents['onBlurAlpha'];
  onChangeAlpha: TUseColorPickerEvents['onChangeAlpha'];
  onChangeAlphaHandler: TFunc<[string]>;
};

export const ColorPickerInputAlpha: FC<TColorPickerInputAlphaProps> = ({
  alphaValue,
  className,
  classNameInputUnit,
  onBlur,
  onChangeAlpha,
  onChangeAlphaHandler,
}) => {
  const inputAlpha = useRef(null);

  return (
    <TextField
      className={className}
      e2eValue="alpha"
      endAdorment={
        <ScrubbableInput
          max={100}
          min={0}
          onChange={(value) => onChangeAlphaHandler(value.toString())}
          value={parseInt(alphaValue)}
        >
          <div className={classNameInputUnit}>%</div>
        </ScrubbableInput>
      }
      max={100}
      min={0}
      onBlur={onBlur}
      onChange={onChangeAlpha}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, inputAlpha.current)(event)}
      ref={inputAlpha}
      type="number"
      value={alphaValue}
    />
  );
};

export default ColorPickerInputAlpha;
