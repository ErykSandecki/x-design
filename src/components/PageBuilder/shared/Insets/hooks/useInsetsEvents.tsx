import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { InsetMode } from '../enums';
import { TInsets, TInsetsName } from 'types';
import { TUseBlurEvents, useBlurEvents } from './useBlurEvents';
import { TUseChangeEvents, useChangeEvents } from './useChangeEvents';

// utils
import { getInsetValue } from '../utils/getInsetValue';
import { isMixed } from '../../../utils/isMixed';

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
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMultiple = size(selectedElements) > 1;
  const isMixedB = isMixed(elements, firstElement, `${insetsName}.b`, selectedElements);
  const isMixedL = isMixed(elements, firstElement, `${insetsName}.l`, selectedElements);
  const isMixedR = isMixed(elements, firstElement, `${insetsName}.r`, selectedElements);
  const isMixedT = isMixed(elements, firstElement, `${insetsName}.t`, selectedElements);
  const isMixedInset = { b: isMixedB, l: isMixedL, r: isMixedR, t: isMixedT };
  const isMixedLR = isMixedL || isMixedR;
  const isMixedTB = isMixedT || isMixedB;
  const insets = element[insetsName];
  const [insetLR, setInsetLR] = useState('');
  const [insetTB, setInsetTB] = useState('');
  const [insetAll, setInsetAll] = useState({ b: '', l: '', r: '', t: '' });
  const [insetMode, setInsetMode] = useState(InsetMode.merged);
  const isInsetModeMerged = insetMode === InsetMode.merged;

  useEffect(() => {
    const b = isMixedB ? 'Mixed' : insets.b.value.toString();
    const l = isMixedL ? 'Mixed' : insets.l.value.toString();
    const r = isMixedR ? 'Mixed' : insets.r.value.toString();
    const t = isMixedT ? 'Mixed' : insets.t.value.toString();

    setInsetAll({ b, l, r, t });
    setInsetLR(isMixedLR ? 'Mixed' : getInsetValue(insets, ['l', 'r']));
    setInsetTB(isMixedTB ? 'Mixed' : getInsetValue(insets, ['t', 'b']));
  }, [insets, isMultiple]);

  return {
    ...useBlurEvents(element, insetAll, insetLR, insetTB, insetsName, setInsetAll, setInsetLR, setInsetTB),
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
