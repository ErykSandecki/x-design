import { Dispatch } from 'redux';
import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { BlendMode } from 'types';

const ColumnBlendModeButtonIcons = (dispatch: Dispatch, t: TT): Array<ReactNode> => [
  <UITools.ButtonIcon
    e2eValue="remove-blend"
    key={0}
    name="Minus"
    onClick={() => dispatch(changeProperties({ mixBlendMode: BlendMode.initial }))}
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.remove`) }}
  />,
];

export default ColumnBlendModeButtonIcons;
