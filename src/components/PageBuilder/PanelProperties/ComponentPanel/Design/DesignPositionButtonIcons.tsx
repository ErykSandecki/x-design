import { first } from 'lodash';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { changePosition } from 'store/pageBuilder/actions';
import { elementDataSelectorCreator, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { LayoutType, TElement } from 'types';

const DesignPositionButtonIcons = (areParentsTheSame: boolean, position: TElement['position']): Array<ReactNode> => {
  const dispatch = useDispatch();
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const parent = useSelector(elementDataSelectorCreator(firstElement.parentId));
  const isBaseParent = firstElement.parentId === '-1';
  const isFreeForm = parent.layout.type === LayoutType.freeForm;
  const showButtons = !isBaseParent && !isFreeForm && areParentsTheSame;

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
