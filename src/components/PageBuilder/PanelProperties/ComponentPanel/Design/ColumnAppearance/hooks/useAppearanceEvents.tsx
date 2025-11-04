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
    isMixedOpacity: boolean;
    opacity: string;
    opacityMode: TValueExtended['mode'];
  };

export const useAppearanceEvents = (): TUseAppearanceEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedOpacity = useSelector(isMixedSelectorCreator('opacity.value'));
  const currentOpacity = useSelector(elementAttributeSelectorCreator('opacity', firstElementId));
  const [opacity, setOpacity] = useState('');
  const onBlurEvents = useBlurEvent(currentOpacity, opacity, setOpacity);
  const onChangeEvents = useChangeEvent(currentOpacity, setOpacity);

  useEffect(() => {
    setOpacity(normalizeMultipleValue(isMixedOpacity, currentOpacity.value));
  }, [currentOpacity.value, isMultiple]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    isMixedOpacity,
    opacity,
    opacityMode: currentOpacity.mode,
  };
};
