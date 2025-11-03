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
import { TValueType } from 'types';

// utils
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

type TUseAppearanceEvents = TUseChangeEvent &
  TUseBlurEvent & {
    attachedOpacity: boolean;
    isMixedOpacity: boolean;
    opacity: string;
    opacityType: TValueType;
  };

export const useAppearanceEvents = (): TUseAppearanceEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedOpacity = useSelector(isMixedSelectorCreator('opacity.value'));
  const currentOpacity = useSelector(elementAttributeSelectorCreator('opacity', firstElementId));
  const [opacity, setOpacity] = useState('');
  const onBlurEvents = useBlurEvent(currentOpacity, opacity, setOpacity);
  const onChangeEvents = useChangeEvent(currentOpacity, setOpacity);
  const attachedOpacity = !isMixedOpacity && currentOpacity.type !== 'fixed';

  useEffect(() => {
    setOpacity(normalizeMultipleValue(isMixedOpacity, currentOpacity.value));
  }, [currentOpacity.value, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    attachedOpacity,
    isMixedOpacity,
    opacity,
    opacityType: currentOpacity.type,
  };
};
