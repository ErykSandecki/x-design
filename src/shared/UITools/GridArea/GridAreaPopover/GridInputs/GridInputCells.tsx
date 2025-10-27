import { FC, useRef } from 'react';
import { kebabCase } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import Icon, { TIconProps } from '../../../../UI/Icon/Icon';
import ScrubbableInput from '../../../../ScrubbableInput/ScrubbableInput';
import TextField from '../../../TextField/TextField';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { KeyboardKeys } from 'types';

// utils
import { handleSubmitInput } from 'utils';

export type TGridInputsProps = {
  name: TIconProps['name'];
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  value: string;
};

export const GridInputCells: FC<TGridInputsProps> = ({ name, onBlur, onChange, value }) => {
  const { t } = useTranslation();
  const refInput = useRef<HTMLInputElement>(null);
  const targetName = kebabCase(name);

  return (
    <TextField
      e2eValue={targetName}
      inputRef={refInput}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      onClick={() => refInput.current.select()}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInput.current)(event)}
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.grid.${targetName}`) }}
      type="text"
      startAdornment={
        <ScrubbableInput
          e2eValue={targetName}
          max={100}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={parseInt(value)}
        >
          <Icon height={12} name={name} width={12} />
        </ScrubbableInput>
      }
      value={value}
    />
  );
};

export default GridInputCells;
