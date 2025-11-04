import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TUseBlurEvent, useBlurEvent } from './useBlurEvent';
import { TUseChangeEvent, useChangeEvent } from './useChangeEvent';
import { TValueExtended } from 'types';

// utils
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseAppearanceEvents = TUseChangeEvent &
  TUseBlurEvent & {
    borderRadius: string;
    borderRadiusMode: TValueExtended['mode'];
    isMixedBorderRadius: boolean;
    isMixedOpacity: boolean;
    opacity: string;
    opacityMode: TValueExtended['mode'];
  };

export const useAppearanceEvents = (): TUseAppearanceEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const currentBorderRadius = useSelector(elementAttributeSelectorCreator('borderRadius', firstElementId));
  const currentOpacity = useSelector(elementAttributeSelectorCreator('opacity', firstElementId));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedB = useSelector(isMixedSelectorCreator(`borderRadius.b`));
  const isMixedL = useSelector(isMixedSelectorCreator(`borderRadius.l`));
  const isMixedR = useSelector(isMixedSelectorCreator(`borderRadius.r`));
  const isMixedT = useSelector(isMixedSelectorCreator(`borderRadius.t`));
  const isMixedAnyInset = isMixedB || isMixedL || isMixedR || isMixedT;
  const { b, l, r, t } = currentBorderRadius;
  const isMixedBorderRadiusMode = [l, r, t].some((inset) => inset.mode !== b.mode);
  const isMixedBorderRadiusValue = [l, r, t].some((inset) => inset.value !== b.value);
  const isMixedBorderRadius = isMixedAnyInset || isMixedBorderRadiusMode || isMixedBorderRadiusValue;
  const isMixedOpacity = useSelector(isMixedSelectorCreator('opacity.value'));
  const [borderRadius, setBorderRadius] = useState('');
  const [opacity, setOpacity] = useState('');
  const onChangeEvents = useChangeEvent(currentOpacity, setBorderRadius, setOpacity);
  const onBlurEvents = useBlurEvent(
    borderRadius,
    currentBorderRadius,
    currentOpacity,
    isMixedBorderRadius,
    opacity,
    setBorderRadius,
    setOpacity,
  );

  useEffect(() => {
    setBorderRadius(normalizeMultipleValue(isMixedBorderRadius, b.value));
  }, [b.value, l.value, r.value, t.value, isMultiple]);

  useEffect(() => {
    setOpacity(normalizeMultipleValue(isMixedOpacity, currentOpacity.value));
  }, [currentOpacity.value, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    borderRadius,
    borderRadiusMode: b.mode,
    isMixedBorderRadius,
    isMixedOpacity,
    opacity,
    opacityMode: currentOpacity.mode,
  };
};
