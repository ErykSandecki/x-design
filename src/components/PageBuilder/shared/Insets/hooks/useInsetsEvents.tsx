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
import { InsetMode } from '../enums';
import { TInsets, TInsetsName } from 'types';
import { TUseBlurEvents, useBlurEvents } from './useBlurEvents';
import { TUseChangeEvents, useChangeEvents } from './useChangeEvents';

// utils
import { getInsetValue } from '../utils/getInsetValue';
import { normalizeMultipleValue } from '../../../utils/normalizeMultipleValue';

type TUseInsetsEvents = TUseBlurEvents &
  TUseChangeEvents & {
    insetAll: TMapValuesTo<TInsets, string>;
    insetLR: string;
    insetTB: string;
    isInsetModeMerged: boolean;
    isMixedInsetMode: TMapValuesTo<TInsets, boolean>;
    isMixedInsetValue: TMapValuesTo<TInsets, boolean>;
    isMixedLRMode: boolean;
    isMixedLRValue: boolean;
    isMixedTBMode: boolean;
    isMixedTBValue: boolean;
    setInsetMode: TFunc<[InsetMode]>;
  };

export const useInsetsEvents = (insetsName: TInsetsName): TUseInsetsEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedBM = useSelector(isMixedSelectorCreator(`${insetsName}.b.mode`));
  const isMixedBV = useSelector(isMixedSelectorCreator(`${insetsName}.b.value`));
  const isMixedLM = useSelector(isMixedSelectorCreator(`${insetsName}.l.mode`));
  const isMixedLV = useSelector(isMixedSelectorCreator(`${insetsName}.l.value`));
  const isMixedRM = useSelector(isMixedSelectorCreator(`${insetsName}.r.mode`));
  const isMixedRV = useSelector(isMixedSelectorCreator(`${insetsName}.r.value`));
  const isMixedTM = useSelector(isMixedSelectorCreator(`${insetsName}.t.mode`));
  const isMixedTV = useSelector(isMixedSelectorCreator(`${insetsName}.t.value`));
  const isMixedInsetMode = { b: isMixedBM, l: isMixedLM, r: isMixedRM, t: isMixedTM };
  const isMixedInsetValue = { b: isMixedBV, l: isMixedLV, r: isMixedRV, t: isMixedTV };
  const isMixedLRMode = isMixedLM || isMixedRM;
  const isMixedLRValue = isMixedLV || isMixedRV;
  const isMixedTBMode = isMixedTM || isMixedBM;
  const isMixedTBValue = isMixedTV || isMixedBV;
  const insets = useSelector(elementAttributeSelectorCreator(insetsName, firstElementId));
  const [insetLR, setInsetLR] = useState('');
  const [insetTB, setInsetTB] = useState('');
  const [insetAll, setInsetAll] = useState({ b: '', l: '', r: '', t: '' });
  const [insetMode, setInsetMode] = useState(InsetMode.merged);
  const isInsetModeMerged = insetMode === InsetMode.merged;

  useEffect(() => {
    const b = normalizeMultipleValue(isMixedBV, insets.b.value);
    const l = normalizeMultipleValue(isMixedLV, insets.l.value);
    const r = normalizeMultipleValue(isMixedRV, insets.r.value);
    const t = normalizeMultipleValue(isMixedTV, insets.t.value);

    setInsetAll({ b, l, r, t });
    setInsetLR(normalizeMultipleValue(isMixedLRValue, getInsetValue(insets, ['l', 'r'])));
    setInsetTB(normalizeMultipleValue(isMixedTBValue, getInsetValue(insets, ['t', 'b'])));
  }, [insets, isMixedLRMode, isMixedLRValue, isMixedTBMode, isMixedTBValue, isMultiple]);

  return {
    ...useBlurEvents(insets, insetAll, insetLR, insetTB, insetsName, setInsetAll, setInsetLR, setInsetTB),
    ...useChangeEvents(insetAll, insetLR, insets, insetTB, insetsName, setInsetAll, setInsetLR, setInsetTB),
    insetAll,
    insetLR,
    insetTB,
    isInsetModeMerged,
    isMixedInsetMode,
    isMixedInsetValue,
    isMixedLRMode,
    isMixedLRValue,
    isMixedTBMode,
    isMixedTBValue,
    setInsetMode,
  };
};
