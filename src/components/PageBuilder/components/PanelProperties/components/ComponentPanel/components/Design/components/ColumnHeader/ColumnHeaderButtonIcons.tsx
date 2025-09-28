import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

const ColumnHeaderButtonIcons = (): Array<ReactNode> => [
  <UITools.ButtonIcon key={0} name="HtmlTag" />,
  <UITools.ButtonIcon key={1} name="Component" />,
];

export default ColumnHeaderButtonIcons;
