import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

// store
import {
  areParentsTheSameSelector,
  dynamicDataSelector,
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { changeLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType, TElement } from 'types';

// utils
import { isMixed } from '../utils/isMixed';

export type TUseDesignData = {
  areParentsTheSame: boolean;
  isMixedLayoutType: boolean;
  layoutType: TElement['layout']['type'];
  onChangeLayoutType: () => void;
  position: TElement['position'];
};

export const useDesignData = (): TUseDesignData => {
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const dispatch = useDispatch();
  const dynamicData = useSelector(dynamicDataSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const isMixedLayoutType = isMixed(dynamicData, firstElement, 'layout.type', selectedElements);
  const { position, layout } = useSelector(elementAllDataSelectorCreator(firstElement.id));

  const onChangeLayoutType = (): void => {
    if (isMixedLayoutType) {
      dispatch(changeLayout(LayoutType.vertical));
    } else {
      const targetLayout = layout.type === LayoutType.default ? LayoutType.vertical : LayoutType.default;

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
