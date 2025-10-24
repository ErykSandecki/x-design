import { ReactNode } from 'react';

// components
import PopoverAutoLayoutSettings from './PopoverAutoLayoutSettings/PopoverAutoLayoutSettings';
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from 'components/PageBuilder/constants';
import { POPOVER_AUTO_LAYOUT_SETTINGS_ID } from './constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { TElement } from 'types';

const ColumnAlignmentLayoutButtonIcons = (layout: TElement['layout'], t: TT, width: number): Array<ReactNode> => [
  <UITools.ButtonIcon
    e2eValue="properties"
    idContainer={PANEL_PROPERTIES_ID}
    key={0}
    name="Properties"
    popoverChildren={<PopoverAutoLayoutSettings layout={layout} />}
    popoverId={POPOVER_AUTO_LAYOUT_SETTINGS_ID}
    popoverOffset={{ x: width - 30, y: 0 }}
    popoverStyle={{ width: '240px' }}
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.autoLayoutSettings`) }}
    selected={false}
  />,
];

export default ColumnAlignmentLayoutButtonIcons;
