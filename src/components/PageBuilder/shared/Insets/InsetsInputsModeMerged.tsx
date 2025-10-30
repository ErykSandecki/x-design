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
}) => {
  if (!isInsetModeMerged) {
    return null;
  }

  return (
    <>
      <InsetsInput
        insetName={`${insetsName}LR`}
        isMixed={isMixedLR}
        onBlur={onBlurInsetLR}
        onChange={onChangeInsetLR}
        type="text"
        value={insetLR}
      />
      <InsetsInput
        insetName={`${insetsName}TB`}
        isMixed={isMixedTB}
        onBlur={onBlurInsetTB}
        onChange={onChangeInsetTB}
        type="text"
        value={insetTB}
      />
    </>
  );
};

export default InsetsInputsModeMerged;
