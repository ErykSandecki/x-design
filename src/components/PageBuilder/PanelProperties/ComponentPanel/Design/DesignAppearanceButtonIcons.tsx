import { Dispatch } from 'redux';
import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

const DesignAppearanceButtonIcons = (dispatch: Dispatch, t: TT, visible: TElement['visible']): Array<ReactNode> => [
  <UITools.ButtonIcon
    key={0}
    name={visible ? 'EyesOpened' : 'EyesClosed'}
    onClick={() => dispatch(changeProperties({ visible: !visible }))}
    tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.appearance.${visible ? 'hide' : 'show'}`) }}
    selected={!visible}
  />,
];

export default DesignAppearanceButtonIcons;
