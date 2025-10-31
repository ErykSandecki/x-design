import { FC, useRef } from 'react';

// components
import ScrubbableInput from '../../ScrubbableInput/ScrubbableInput';
import TextField from '../TextField/TextField';

// types
import { TColor } from 'types';
import { TUseColorPickerEvents } from './hooks/useColorPickerEvents';

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
      inputRef={inputAlpha}
      type="number"
      value={alphaValue}
    />
  );
};

export default ColorPickerInputAlpha;
