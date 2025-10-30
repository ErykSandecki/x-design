import { FC } from 'react';
import { upperCase } from 'lodash';

// components
import InsetsInput from './InsetsInput';

// types
import { TInsets, TInsetsName } from 'types';
import { TUseBlurEvents } from './hooks/useBlurEvents';
import { TUseChangeEvents } from './hooks/useChangeEvents';

export type TInsetsInputsModeIndividualProps = Pick<TUseBlurEvents, 'onBlurInset'> &
  Pick<TUseChangeEvents, 'onChangeInset'> & {
    insets: TMapValuesTo<TInsets, string>;
    insetsName: TInsetsName;
    isInsetModeMerged: boolean;
    isMixedInset: TMapValuesTo<TInsets, boolean>;
  };

export const InsetsInputsModeIndividual: FC<TInsetsInputsModeIndividualProps> = ({
  insets,
  insetsName,
  isInsetModeMerged,
  isMixedInset,
  onBlurInset,
  onChangeInset,
}) => {
  if (isInsetModeMerged) {
    return null;
  }

  return ['l', 't', 'r', 'b'].map((key: keyof TInsets) => (
    <InsetsInput
      insetName={`${insetsName}${upperCase(key)}`}
      isMixed={isMixedInset[key]}
      key={key}
      onBlur={() => onBlurInset(key)}
      onChange={(value, isScrubbableInput) => onChangeInset(value, key, isScrubbableInput)}
      type="number"
      value={insets[key]}
    />
  ));
};

export default InsetsInputsModeIndividual;
