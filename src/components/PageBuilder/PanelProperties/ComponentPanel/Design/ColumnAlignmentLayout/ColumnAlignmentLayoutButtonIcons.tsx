import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const ColumnAlignmentLayoutButtonIcons = (t: TT): Array<ReactNode> => [
  <UITools.ButtonIcon
    e2eValue="properties"
    key={0}
    name="Properties"
    onClick={() => {}}
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.autoLayoutSettings`) }}
    selected={false}
  />,
];

export default ColumnAlignmentLayoutButtonIcons;
