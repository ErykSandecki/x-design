import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import {
  areParentsTheSameSelector,
  elementAttributeSelectorCreator,
  elementDataSelectorCreator,
  firstSelectedElementIdSelector,
  firstSelectedElementParentIdSelector,
} from 'store/pageBuilder/selectors';
import { changePosition } from 'store/pageBuilder/actions';

// types
import { LayoutType } from 'types';

const DesignPositionButtonIcons: FC = () => {
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const dispatch = useDispatch();
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const parentId = useSelector(firstSelectedElementParentIdSelector);
  const parent = useSelector(elementDataSelectorCreator(parentId));
  const position = useSelector(elementAttributeSelectorCreator('position', firstElementId));
  const isBaseParent = parentId === '-1';
  const isFreeForm = parent.layout.type === LayoutType.freeForm;
  const isGrid = parent.layout.type === LayoutType.grid;
  const showButtons = !isBaseParent && !isFreeForm && !isGrid && areParentsTheSame;

  return showButtons
    ? [
        <UITools.ButtonIcon
          key={0}
          name="PositionSwitcher"
          onClick={() => dispatch(changePosition())}
          selected={position === 'absolute'}
        />,
      ]
    : [];
};

export default DesignPositionButtonIcons;
