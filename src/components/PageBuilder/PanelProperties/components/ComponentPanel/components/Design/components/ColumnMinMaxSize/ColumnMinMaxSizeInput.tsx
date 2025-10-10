import { capitalize } from 'lodash';
import { FC, ReactNode, useRef } from 'react';

// components
import { Icon, ScrubbableInput, TE2EValue, TIconProps, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../../../../constants';

// types
import { ColorsTheme, KeyboardKeys, TElement, TScore } from 'types';

// utils
import { handleSubmitInput, sanitizeNumberInput } from 'utils';

export type TColumnResizingInputProps = {
  e2eValue: TE2EValue;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  popoverChildren?: ReactNode;
  score: keyof TScore;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: string;
  valueScrubbaleInput: number;
};

const ColumnMinMaxSizeInput: FC<TColumnResizingInputProps> = ({
  e2eValue,
  onBlur,
  onChange,
  popoverChildren,
  score,
  sizeType,
  value,
  valueScrubbaleInput,
}) => {
  const refInput = useRef<HTMLInputElement>(null);
  const iconName = `${capitalize(score)}${capitalize(sizeType)}` as TIconProps['name'];

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      onClick={() => refInput.current.select()}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInput.current)(event)}
      popoverChildren={popoverChildren}
      ref={refInput}
      startAdornment={
        <ScrubbableInput
          e2eValue={e2eValue}
          max={MAX}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={valueScrubbaleInput}
        >
          <Icon color={ColorsTheme.neutral2} height={12} name={iconName} width={12} />
        </ScrubbableInput>
      }
      type="number"
      value={value}
    />
  );
};

export default ColumnMinMaxSizeInput;
