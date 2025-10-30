import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

// store
import {
  areParentsTheSameSelector,
  elementDataSelectorCreator,
  elementsSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { changeLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType, TElement } from 'types';

// utils
import { isMixed } from '../../../../utils/isMixed';

export type TUseDesignData = {
  areParentsTheSame: boolean;
  isMixedLayoutType: boolean;
  layoutType: TElement['layout']['type'];
  onChangeLayoutType: TFunc;
  position: TElement['position'];
};

export const useDesignData = (): TUseDesignData => {
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const dispatch = useDispatch();
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const isMixedLayoutType = isMixed(elements, firstElement, 'layout.type', selectedElements);
  const { position, layout } = useSelector(elementDataSelectorCreator(firstElement.id));

  const onChangeLayoutType = (): void => {
    if (isMixedLayoutType) {
      dispatch(changeLayout(LayoutType.vertical));
    } else {
      const isDefault = layout.type === LayoutType.freeForm;
      const targetLayout = isDefault ? LayoutType.vertical : LayoutType.freeForm;

      dispatch(changeLayout(targetLayout));
    }
  };

  return {
    areParentsTheSame,
    isMixedLayoutType,
    layoutType: layout.type,
    onChangeLayoutType,
    position,
  };
};
