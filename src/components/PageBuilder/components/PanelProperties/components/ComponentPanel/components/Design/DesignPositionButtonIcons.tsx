import { ReactNode } from 'react';
import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { changePosition } from 'store/pageBuilder/actions';
import { selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

const DesignPositionButtonIcons = (areParentsTheSame: boolean, position: TElement['position']): Array<ReactNode> => {
  const dispatch = useDispatch();
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const showButtons = firstElement.parentId !== '-1' && areParentsTheSame;

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
