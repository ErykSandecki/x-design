import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const DesignFillButtonIcons: FC = () => {
  const { t } = useTranslation();

  return [
    <UITools.ButtonIcon
      key={0}
      name="PlusOutlined"
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.addFill`) }}
    />,
  ];
};

export default DesignFillButtonIcons;
