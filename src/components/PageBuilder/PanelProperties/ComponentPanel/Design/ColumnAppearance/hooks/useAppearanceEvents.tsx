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
    isMixedBorderRadiusMode: boolean;
    isMixedBorderRadiusValue: boolean;
    isMixedOpacity: boolean;
    opacity: string;
    opacityMode: TValueExtended['mode'];
  };

export const useAppearanceEvents = (): TUseAppearanceEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const currentBorderRadius = useSelector(elementAttributeSelectorCreator('borderRadius', firstElementId));
  const currentOpacity = useSelector(elementAttributeSelectorCreator('opacity', firstElementId));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedBM = useSelector(isMixedSelectorCreator(`borderRadius.b.mode`));
  const isMixedBV = useSelector(isMixedSelectorCreator(`borderRadius.b.value`));
  const isMixedLM = useSelector(isMixedSelectorCreator(`borderRadius.l.mode`));
  const isMixedLV = useSelector(isMixedSelectorCreator(`borderRadius.l.value`));
  const isMixedRM = useSelector(isMixedSelectorCreator(`borderRadius.r.mode`));
  const isMixedRV = useSelector(isMixedSelectorCreator(`borderRadius.r.value`));
  const isMixedTM = useSelector(isMixedSelectorCreator(`borderRadius.t.mode`));
  const isMixedTV = useSelector(isMixedSelectorCreator(`borderRadius.t.value`));
  const isMixedInsetM = isMixedBM || isMixedLM || isMixedRM || isMixedTM;
  const isMixedInsetV = isMixedBV || isMixedLV || isMixedRV || isMixedTV;
  const { b, l, r, t } = currentBorderRadius;
  const isMixedBorderRadiusM = [l, r, t].some((inset) => inset.mode !== b.mode);
  const isMixedBorderRadiusV = [l, r, t].some((inset) => inset.value !== b.value);
  const isMixedBorderRadiusMode = isMixedInsetM || isMixedBorderRadiusM;
  const isMixedBorderRadiusValue = isMixedInsetV || isMixedBorderRadiusV;
  const isMixedOpacity = useSelector(isMixedSelectorCreator('opacity.value'));
  const [borderRadius, setBorderRadius] = useState('');
  const [opacity, setOpacity] = useState('');
  const onChangeEvents = useChangeEvent(currentBorderRadius, currentOpacity, setBorderRadius, setOpacity);
  const onBlurEvents = useBlurEvent(
    borderRadius,
    currentBorderRadius,
    currentOpacity,
    isMixedBorderRadiusValue,
    opacity,
    setBorderRadius,
    setOpacity,
  );

  useEffect(() => {
    setBorderRadius(normalizeMultipleValue(isMixedBorderRadiusValue, b.value, b.unit));
  }, [b, isMixedBorderRadiusValue, isMultiple, l, r, t]);

  useEffect(() => {
    setOpacity(normalizeMultipleValue(isMixedOpacity, currentOpacity.value));
  }, [currentOpacity.value, isMixedOpacity, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    borderRadius,
    borderRadiusMode: b.mode,
    isMixedBorderRadiusMode,
    isMixedBorderRadiusValue,
    isMixedOpacity,
    opacity,
    opacityMode: currentOpacity.mode,
  };
};
