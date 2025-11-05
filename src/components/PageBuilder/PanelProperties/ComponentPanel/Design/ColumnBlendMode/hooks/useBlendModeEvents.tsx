import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// utils
import { normalizeMultipleValue } from '../../../../../utils/normalizeMultipleValue';

export type TUseBlendModeEvents = {
  isMixedBlendMode: boolean;
  mixBlendMode: string;
};

export const useBlendModeEvents = (): TUseBlendModeEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const currentMixBlendMode = useSelector(elementAttributeSelectorCreator('mixBlendMode', firstElementId));
  const isMixedBlendMode = useSelector(isMixedSelectorCreator('mixBlendMode'));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const [mixBlendMode, setMixBlendMode] = useState<string>(currentMixBlendMode);

  useEffect(() => {
    setMixBlendMode(normalizeMultipleValue(isMixedBlendMode, currentMixBlendMode));
  }, [currentMixBlendMode, isMixedBlendMode, isMultiple]);

  return { isMixedBlendMode, mixBlendMode };
};
