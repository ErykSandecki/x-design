import { FC, useRef } from 'react';
import { kebabCase, upperFirst } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, TIconProps, UITools } from 'shared';

// others
import { MAX, MIN } from '../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { KeyboardKeys } from 'types';

// utils
import { handleSubmitInput } from 'utils';

export type TInsetsInputProps = {
  insetName: string;
  isMixed: boolean;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  type: 'number' | 'text';
  value: string;
};

const InsetsInput: FC<TInsetsInputProps> = ({ insetName, isMixed, onBlur, onChange, type, value }) => {
  const e2eValue = kebabCase(insetName);
  const refInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      onClick={() => refInput.current.select()}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInput.current)(event)}
      inputRef={refInput}
      startAdornment={
        <ScrubbableInput
          e2eValue={e2eValue}
          icon={upperFirst(insetName) as TIconProps['name']}
          iconHeight={12}
          iconWidth={12}
          max={MAX}
          min={MIN}
          onChange={(value) => onChange(value.toString(), true)}
          value={isMixed ? 0 : parseInt(value)}
        />
      }
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.${insetName}`) }}
      type={type}
      value={value}
    />
  );
};

export default InsetsInput;
