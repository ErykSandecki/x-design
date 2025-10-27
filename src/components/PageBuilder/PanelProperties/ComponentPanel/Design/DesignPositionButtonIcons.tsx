import { Dispatch } from 'redux';
import { first } from 'lodash';
import { ReactNode } from 'react';
import { UseSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { changePosition } from 'store/pageBuilder/actions';
import { elementDataSelectorCreator, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { LayoutType, TElement } from 'types';

const DesignPositionButtonIcons = (
  areParentsTheSame: boolean,
  dispatch: Dispatch,
  position: TElement['position'],
  useSelector: UseSelector,
): Array<ReactNode> => {
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const parent = useSelector(elementDataSelectorCreator(firstElement.parentId));
  const isBaseParent = firstElement.parentId === '-1';
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
