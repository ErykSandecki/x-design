import { FC } from 'react';

// components
import InsetsInput from './InsetsInput';

// types
import { TInsetsName } from 'types';
import { TUseBlurEvents } from './hooks/useBlurEvents';
import { TUseChangeEvents } from './hooks/useChangeEvents';

export type TInsetsInputsModeMergedProps = Pick<TUseBlurEvents, 'onBlurInsetLR' | 'onBlurInsetTB'> &
  Pick<TUseChangeEvents, 'onChangeInsetLR' | 'onChangeInsetTB'> & {
    iconSize: number;
    insetLR: string;
    insetsName: TInsetsName;
    insetTB: string;
    isInsetModeMerged: boolean;
    isMixedLRMode: boolean;
    isMixedLRValue: boolean;
    isMixedTBMode: boolean;
    isMixedTBValue: boolean;
    translationNameSpace: string;
  };

export const InsetsInputsModeMerged: FC<TInsetsInputsModeMergedProps> = ({
  iconSize,
  insetLR,
  insetsName,
  insetTB,
  isInsetModeMerged,
  isMixedLRMode,
  isMixedLRValue,
  isMixedTBMode,
  isMixedTBValue,
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
        iconSize={iconSize}
        insetNameFormatted={`${insetsName}LR`}
        insets={['l', 'r']}
        insetsName="padding"
        isMixedMode={isMixedLRMode}
        isMixedValue={isMixedLRValue}
        onBlur={onBlurInsetLR}
        onChange={onChangeInsetLR}
        translationNameSpace={translationNameSpace}
        type="text"
        value={insetLR}
      />
      <InsetsInput
        iconSize={iconSize}
        insetNameFormatted={`${insetsName}TB`}
        insets={['t', 'b']}
        insetsName="padding"
        isMixedMode={isMixedTBMode}
        isMixedValue={isMixedTBValue}
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
