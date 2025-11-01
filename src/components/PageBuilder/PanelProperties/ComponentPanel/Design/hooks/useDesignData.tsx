import { useDispatch, useSelector } from 'react-redux';

// store
import {
  areParentsTheSameSelector,
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';
import { changeLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType, TElement } from 'types';

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
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedLayoutType = useSelector(isMixedSelectorCreator('layout.type'));
  const position = useSelector(elementAttributeSelectorCreator('position', firstElementId));
  const layout = useSelector(elementAttributeSelectorCreator('layout', firstElementId));

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
