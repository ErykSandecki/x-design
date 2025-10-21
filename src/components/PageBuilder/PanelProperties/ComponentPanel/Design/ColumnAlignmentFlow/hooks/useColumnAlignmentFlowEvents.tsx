import { first, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { AlignmentFlow, LayoutType } from 'types';
import { TUseChangeAlignmentEvent, useChangeAlignmentEvent } from './useChangeAlignmentEvent';

// utils
import { isMixed } from '../../utils/isMixed';

type TUseColumnAlignmentFlowEvents = {
  alignment: AlignmentFlow;
  isFreeForm: boolean;
  isMixedLayout: boolean;
  onChangeAlignment: TUseChangeAlignmentEvent;
};

export const useColumnAlignmentFlowEvents = (): TUseColumnAlignmentFlowEvents => {
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMixedAlignment = isMixed(elements, firstElement, 'layout.alignment', selectedElements);
  const isMixedLayout = isMixed(elements, firstElement, 'layout.type', selectedElements);
  const isMultiple = size(selectedElements) > 1;
  const { layout } = element;
  const [alignment, setAlignment] = useState(AlignmentFlow.none);
  const isFreeForm = layout.type === LayoutType.freeForm;

  useEffect(() => {
    setAlignment(isMixedAlignment ? AlignmentFlow.none : layout.alignment);
  }, [layout.alignment, isMultiple]);

  return {
    alignment,
    isFreeForm,
    isMixedLayout,
    onChangeAlignment: useChangeAlignmentEvent(setAlignment),
  };
};
