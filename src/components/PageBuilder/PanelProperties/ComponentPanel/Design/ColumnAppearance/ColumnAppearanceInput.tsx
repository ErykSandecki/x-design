import { FC, ReactNode, useRef } from 'react';

// components
import { Icon, ScrubbableInput, TE2EValue, TIconProps, UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from '../../../../constants';

// types
import { ColorsTheme, TValueExtended } from 'types';

// utils
import { sanitizeNumberInput, valueAttached } from 'utils';

export type TColumnAppearanceInputProps = {
  e2eValue: TE2EValue;
  isMixed: boolean;
  mode: TValueExtended['mode'];
  name: TIconProps['name'];
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  popoverChildren: ReactNode;
  value: string;
};

const ColumnAppearanceInput: FC<TColumnAppearanceInputProps> = ({
  e2eValue,
  isMixed,
  mode,
  name,
  onBlur,
  onChange,
  popoverChildren,
  value,
}) => {
  const attached = valueAttached(mode);
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      inputRef={refInput}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      popoverChildren={popoverChildren}
      startAdornment={
        <ScrubbableInput
          disabled={attached}
          e2eValue={e2eValue}
          max={100}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={isMixed ? 0 : parseInt(value)}
        >
          <Icon color={ColorsTheme.neutral2} height={12} name={name} width={12} />
        </ScrubbableInput>
      }
      type="text"
      value={value}
    />
  );
};

export default ColumnAppearanceInput;
