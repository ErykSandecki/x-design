import { FC } from 'react';
import { kebabCase, upperFirst } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import PopoverInsets from './PopoverInsets/PopoverInsets';
import { ScrubbableInput, TIconProps, UITools } from 'shared';

// others
import { MAX, MIN, PANEL_PROPERTIES_ID } from '../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { TInsets, TInsetsName } from 'types';

export type TInsetsInputProps = {
  insetNameFormatted: string;
  insets: Array<keyof TInsets>;
  insetsName: TInsetsName;
  isMixedMode: boolean;
  isMixedValue: boolean;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  translationNameSpace: string;
  type: 'number' | 'text';
  value: string;
};

const InsetsInput: FC<TInsetsInputProps> = ({
  insetNameFormatted,
  insets,
  insetsName,
  isMixedMode,
  isMixedValue,
  onBlur,
  onChange,
  translationNameSpace,
  type,
  value,
}) => {
  const e2eValue = kebabCase(insetNameFormatted);
  const { t } = useTranslation();

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      isMixedMode={isMixedMode}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      popoverChildren={
        <PopoverInsets
          icon={upperFirst(insetNameFormatted) as TIconProps['name']}
          insetsName={insetsName}
          insets={insets}
          isMixed={isMixedMode}
          translationNameSpace={translationNameSpace}
          value={value}
        />
      }
      startAdornment={
        <ScrubbableInput
          e2eValue={e2eValue}
          icon={upperFirst(insetNameFormatted) as TIconProps['name']}
          iconHeight={12}
          iconWidth={12}
          max={MAX}
          min={MIN}
          onChange={(value) => onChange(value.toString(), true)}
          value={isMixedValue ? 0 : parseInt(value)}
        />
      }
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.${insetNameFormatted}`) }}
      type={type}
      value={value}
    />
  );
};

export default InsetsInput;
