import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const ColumnHeaderButtonIcons = (): Array<ReactNode> => {
  const { t } = useTranslation();

  return [
    <UITools.ButtonIcon
      key={0}
      name="HtmlTag"
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.readyForDevStatus`) }}
    />,
    <UITools.ButtonIcon
      key={1}
      name="Component"
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.createComponent`) }}
    />,
  ];
};

export default ColumnHeaderButtonIcons;
