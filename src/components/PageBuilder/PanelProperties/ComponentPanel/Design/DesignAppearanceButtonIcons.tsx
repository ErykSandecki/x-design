import { Dispatch } from 'redux';
import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// store
import { changeVisibility } from 'store/pageBuilder/actions';
import { TElement } from 'types';

const DesignAppearanceButtonIcons = (dispatch: Dispatch, visible: TElement['visible']): Array<ReactNode> => [
  <UITools.ButtonIcon
    key={0}
    name={visible ? 'EyesOpened' : 'EyesClosed'}
    onClick={() => dispatch(changeVisibility(!visible))}
    selected={!visible}
  />,
];

export default DesignAppearanceButtonIcons;
