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
    isMixedInset: TMapValuesTo<TInsets, boolean>;
    isMixedLR: boolean;
    isMixedTB: boolean;
    setInsetMode: TFunc<[InsetMode]>;
  };

export const useInsetsEvents = (insetsName: TInsetsName): TUseInsetsEvents => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isMixedB = useSelector(isMixedSelectorCreator(`${insetsName}.b.value`));
  const isMixedL = useSelector(isMixedSelectorCreator(`${insetsName}.l.value`));
  const isMixedR = useSelector(isMixedSelectorCreator(`${insetsName}.r.value`));
  const isMixedT = useSelector(isMixedSelectorCreator(`${insetsName}.t.value`));
  const isMixedInset = { b: isMixedB, l: isMixedL, r: isMixedR, t: isMixedT };
  const isMixedLR = isMixedL || isMixedR;
  const isMixedTB = isMixedT || isMixedB;
  const insets = useSelector(elementAttributeSelectorCreator(insetsName, firstElementId));
  const [insetLR, setInsetLR] = useState('');
  const [insetTB, setInsetTB] = useState('');
  const [insetAll, setInsetAll] = useState({ b: '', l: '', r: '', t: '' });
  const [insetMode, setInsetMode] = useState(InsetMode.merged);
  const isInsetModeMerged = insetMode === InsetMode.merged;

  useEffect(() => {
    const b = normalizeMultipleValue(isMixedB, insets.b.value);
    const l = normalizeMultipleValue(isMixedL, insets.l.value);
    const r = normalizeMultipleValue(isMixedR, insets.r.value);
    const t = normalizeMultipleValue(isMixedT, insets.t.value);

    setInsetAll({ b, l, r, t });
    setInsetLR(normalizeMultipleValue(isMixedLR, getInsetValue(insets, ['l', 'r'])));
    setInsetTB(normalizeMultipleValue(isMixedTB, getInsetValue(insets, ['t', 'b'])));
  }, [insets, isMultiple]);

  return {
    ...useBlurEvents(insets, insetAll, insetLR, insetTB, insetsName, setInsetAll, setInsetLR, setInsetTB),
    ...useChangeEvents(insetAll, insetLR, insets, insetTB, insetsName, setInsetAll, setInsetLR, setInsetTB),
    insetAll,
    insetLR,
    insetTB,
    isInsetModeMerged,
    isMixedInset,
    isMixedLR,
    isMixedTB,
    setInsetMode,
  };
};
