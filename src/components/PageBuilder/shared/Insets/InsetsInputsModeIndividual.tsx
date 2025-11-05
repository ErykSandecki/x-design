import { FC } from 'react';
import { upperCase } from 'lodash';

// components
import InsetsInput from './InsetsInput';

// types
import { TInsets, TInsetsName } from 'types';
import { TUseBlurEvents } from './hooks/useBlurEvents';
import { TUseChangeEvents } from './hooks/useChangeEvents';

// utils
import { sanitizeNumberInput } from 'utils';

export type TInsetsInputsModeIndividualProps = Pick<TUseBlurEvents, 'onBlurInset'> &
  Pick<TUseChangeEvents, 'onChangeInset'> & {
    iconSize: number;
    insets: TMapValuesTo<TInsets, string>;
    insetsName: TInsetsName;
    isInsetModeMerged: boolean;
    isMixedInsetMode: TMapValuesTo<TInsets, boolean>;
    isMixedInsetValue: TMapValuesTo<TInsets, boolean>;
    translationNameSpace: string;
  };

export const InsetsInputsModeIndividual: FC<TInsetsInputsModeIndividualProps> = ({
  iconSize,
  insets,
  insetsName,
  isInsetModeMerged,
  isMixedInsetMode,
  isMixedInsetValue,
  onBlurInset,
  onChangeInset,
  translationNameSpace,
}) => {
  if (isInsetModeMerged) {
    return null;
  }

  return ['l', 't', 'r', 'b'].map((key: keyof TInsets) => (
    <InsetsInput
      iconSize={iconSize}
      insetNameFormatted={`${insetsName}${upperCase(key)}`}
      insets={[key]}
      insetsName={insetsName}
      isMixedMode={isMixedInsetMode[key]}
      isMixedValue={isMixedInsetValue[key]}
      key={key}
      onBlur={() => onBlurInset(key)}
      onChange={(value, isScrubbableInput) => onChangeInset(sanitizeNumberInput(value), key, isScrubbableInput)}
      translationNameSpace={translationNameSpace}
      type="text"
      value={insets[key]}
    />
  ));
};

export default InsetsInputsModeIndividual;
