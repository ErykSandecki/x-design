import { useDispatch, useSelector } from 'react-redux';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';
import { changeLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType } from 'types';

export type TUseDesignData = {
  onChangeLayoutType: TFunc;
};

export const useDesignData = (): TUseDesignData => {
  const dispatch = useDispatch();
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedLayoutType = useSelector(isMixedSelectorCreator('layout.type'));
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
    onChangeLayoutType,
  };
};
