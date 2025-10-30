import { FC } from 'react';

// components
import InsetsInput from './InsetsInput';

// types
import { TInsetsName } from 'types';
import { TUseBlurEvents } from './hooks/useBlurEvents';
import { TUseChangeEvents } from './hooks/useChangeEvents';

export type TInsetsInputsModeMergedProps = Pick<TUseBlurEvents, 'onBlurInsetLR' | 'onBlurInsetTB'> &
  Pick<TUseChangeEvents, 'onChangeInsetLR' | 'onChangeInsetTB'> & {
    insetLR: string;
    insetsName: TInsetsName;
    insetTB: string;
    isInsetModeMerged: boolean;
    isMixedLR: boolean;
    isMixedTB: boolean;
    translationNameSpace: string;
  };

export const InsetsInputsModeMerged: FC<TInsetsInputsModeMergedProps> = ({
  insetLR,
  insetsName,
  insetTB,
  isInsetModeMerged,
  isMixedLR,
  isMixedTB,
  onBlurInsetLR,
  onBlurInsetTB,
  onChangeInsetLR,
  onChangeInsetTB,
  translationNameSpace,
}) => {
  if (!isInsetModeMerged) {
    return null;
  }

  return (
    <>
      <InsetsInput
        insetNameFormatted={`${insetsName}LR`}
        insets={['l', 'r']}
        insetsName="padding"
        isMixed={isMixedLR}
        onBlur={onBlurInsetLR}
        onChange={onChangeInsetLR}
        translationNameSpace={translationNameSpace}
        type="text"
        value={insetLR}
      />
      <InsetsInput
        insetNameFormatted={`${insetsName}TB`}
        insets={['t', 'b']}
        insetsName="padding"
        isMixed={isMixedTB}
        onBlur={onBlurInsetTB}
        onChange={onChangeInsetTB}
        translationNameSpace={translationNameSpace}
        type="text"
        value={insetTB}
      />
    </>
  );
};

export default InsetsInputsModeMerged;
