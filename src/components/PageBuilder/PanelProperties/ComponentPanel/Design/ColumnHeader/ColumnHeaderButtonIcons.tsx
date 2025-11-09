import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const ColumnHeaderButtonIcons = (t: TT): Array<ReactNode> => [
  <UITools.ButtonIcon
    iconSize={14}
    key={0}
    name="HtmlTag"
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.readyForDevStatus`) }}
  />,
  <UITools.ButtonIcon
    iconSize={14}
    key={1}
    name="Component"
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.createComponent`) }}
  />,
];

export default ColumnHeaderButtonIcons;
