import { Dispatch } from 'redux';
import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { LayoutType, TLayout } from 'types';

const ColumnFlowButtonIcons = (
  dispatch: Dispatch,
  isMixedLayoutType: boolean,
  isMixedLayoutWrap: boolean,
  layout: TLayout,
  t: TT,
): Array<ReactNode> =>
  layout.type === LayoutType.horizontal && !isMixedLayoutType
    ? [
        <UITools.ButtonIcon
          e2eValue="wrap"
          key={0}
          name="Wrap"
          onClick={() => dispatch(changeProperties({ layout: { ...layout, wrap: !layout.wrap } }))}
          tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.wrap`) }}
          selected={isMixedLayoutWrap ? false : layout.wrap}
        />,
      ]
    : [];

export default ColumnFlowButtonIcons;
