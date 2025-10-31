import { capitalize } from 'lodash';
import { FC, ReactNode } from 'react';

// components
import { Icon, ScrubbableInput, TE2EValue, TIconProps, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../constants';

// types
import { ColorsTheme, TElement, TScore } from 'types';

// utils
import { sanitizeNumberInput } from 'utils';

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
  const iconName = `${capitalize(score)}${capitalize(sizeType)}` as TIconProps['name'];

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      popoverChildren={popoverChildren}
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
