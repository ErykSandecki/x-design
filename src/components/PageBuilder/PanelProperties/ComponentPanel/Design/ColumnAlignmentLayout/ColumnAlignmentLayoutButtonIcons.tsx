import { ReactNode } from 'react';

// components
import PopoverAutoLayoutSettings from './PopoverAutoLayoutSettings/PopoverAutoLayoutSettings';
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from 'components/PageBuilder/constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const ColumnAlignmentLayoutButtonIcons = (t: TT): Array<ReactNode> => [
  <UITools.ButtonIcon
    e2eValue="properties"
    idContainer={PANEL_PROPERTIES_ID}
    key={0}
    name="Properties"
    popoverChildren={<PopoverAutoLayoutSettings />}
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.autoLayoutSettings`) }}
    selected={false}
  />,
];

export default ColumnAlignmentLayoutButtonIcons;
